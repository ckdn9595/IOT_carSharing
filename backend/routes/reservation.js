const express = require('express');
const db = require('../models/index');
const jwt = require('jsonwebtoken');
const router = express.Router();

process.env.JWT_SECRET = "secret";

router.post('/', async(req, res) => {
    console.log(req.body);
    try {
        // get token from header
        const userToken = req.headers['authorization']
        const token = userToken.replace(/^Bearer\s+/,'');
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);
        if(decodedUserToken == null){
            return res.status(400).json({
                message: 'invailed token'
            });
        } else if (decodedUserToken.exp < Date.now()/1000){
            return res.status(400).json({
                message: 'token expired'
            });
        } else {
            const {
                usrSeq,
                startDate,
                endDate,
                carSeq,
                resInfoSeq
            } = req.body
            await db.tb_car_info.create({
                usr_seq: usrSeq,
                res_info_seq: resInfoSeq,
                car_seq: carSeq,
                res_date_start: startDate,
                res_date_end: endDate,
            })
            return res.status(200).json({
                register:'success'
            });
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            carRes:error
        });
    }
});

module.exports = router;