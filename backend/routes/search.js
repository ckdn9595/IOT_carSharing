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

        let optionConverted = [];
        for (let i = 0; i < option.carSizes.length; i++) {
            if (option.carSizes[i] === false) {
                optionConverted.push(i);
            }
        }

        const cars = await db['tb_car'].findAll({
            where: {
                car_segment: {
                    [Op.or]: optionConverted
                },
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

        let carsSeq = [];
        for (let i = 0; i < cars.length; i++) {
            carsSeq.push(cars[i].car_seq);
        }

        const carsResAvailable = await db['tb_car_res_info'].findAll({
            where: {
                car_seq: {
                    [Op.or]: carsSeq
                },
                car_res_date_start: {
                    [Op.lte]: option.endDate
                },
                car_res_date_end: {
                    [Op.gte]: option.startDate
                }
            }
        });

        if (carsResAvailable.length === 0) {
            return res.status(200).json({statusCode: 1});
        }
        else {
            let carsResAvailableSeq = [];
            for (let i = 0; i < carsResAvailable.length; i++) {
                carsResAvailableSeq.push(carsResAvailable[i].car_seq);
            }

            const carsResult = await db['tb_car'].findAll({
                where: {
                    car_seq: {
                        [Op.or]: carsResAvailableSeq
                    }
                }
            });
            return res.status(200).json(carsResult);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


module.exports = router;