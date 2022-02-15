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

            let carsResult = await db['tb_car'].findAll({
                where: {
                    car_seq: {
                        [Op.or]: carsResAvailableSeq
                    }
                }
            });
            for (let i = 0; i < carsResult.length; i++) {
                carsResult[i].car_reg_dt.setHours(carsResult[i].car_reg_dt.getHours() + 9);
            }

            return res.status(200).json(carsResult);
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


router.get('/detail/:carID', async (req, res) => {
    try {
        const carInfo = await db['tb_car'].findOne({
            where: {car_seq: req.params.carID}
        });
        if (carInfo) {
            const carRegDt = carInfo.car_reg_dt.setHours(carInfo.car_reg_dt.getHours() + 9);

            let carRes = await db['tb_car_res_info'].findOne({
                where: {car_seq: req.params.carID}
            });
            carRes.car_res_date_start.setHours(carRes.car_res_date_start.getHours() + 9);
            carRes.car_res_date_end.setHours(carRes.car_res_date_end.getHours() + 9);

            return res.status(200).json({
                car_num: carInfo.car_num,
                car_isValid: carInfo.car_isValid,
                car_rent_insurance_yn: carInfo.car_rent_insurance_yn,
                car_img: carInfo.car_img,
                car_reg_dt: carRegDt,
                car_model: carInfo.car_model,
                car_segment: carInfo.car_segment,
                car_fuel: carInfo.car_fuel,
                car_rate: carInfo.car_rate,
                car_year: carInfo.car_year,
                car_dy: carInfo.car_dy,
                car_dx: carInfo.car_dx,
                car_res_date_start: carRes.car_res_date_start,
                car_res_date_end: carRes.car_res_date_end
            });
        }
        else {
            return res.status(404).json({statusCode: 2});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


module.exports = router;