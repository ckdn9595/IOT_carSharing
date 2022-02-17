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

            const carOwner = await db.tb_car_res_info.findOne({
                where: {car_seq: carSeq}
            });

            if (carOwner.usr_seq !== null) {
                await db.tb_car_info.create({
                    owner_usr_seq: carOwner.usr_seq,
                    usr_seq: usrSeq,
                    res_info_seq: resInfoSeq,
                    car_seq: carSeq,
                    res_date_start: startDate,
                    res_date_end: endDate,
                });
                return res.status(200).json({
                    reservation:'success'
                });
            }
            else {
                return res.status(404).json({
                    reservation: 'No such car'
                });
            }

            
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            reservation: 'error'
        });
    }
});


module.exports = router;