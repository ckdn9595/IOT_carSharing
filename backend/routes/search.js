const express = require('express');
const db = require('../models/index');
const { Op } = require('sequelize');

const router = express.Router();


router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const {
            option,
            location
        } = req.body;

        const cars = await db['tb_car'].findAll({
            where: {
                car_dx: {
                    [Op.gte]: location.swLatLng.La,
                    [Op.lte]: location.neLatLng.La
                }, 
                car_dy: {
                    [Op.gte]: location.swLatLng.Ma,
                    [Op.lte]: location.neLatLng.Ma
                }
            }
        });
        
        return res.status(200).json(cars);
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


module.exports = router;