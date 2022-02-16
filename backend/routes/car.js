const express = require('express');

const db = require('../models/index');

const {upload} = require('../utils/multer');

const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = "secret";

// api/car
const router = express.Router();


// 차량등록 API
router.post('/register', upload.single('carImg'), async(req, res) => {
    console.log(req.body);
    try {
        // JWT 유효성 검증
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        // 받아온 carImg가 .png || .jpeg이 아닌 경우 에러
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
            return res.status(400).json({status_code: 1});
        }

        // 필요한 항목이 모두 req.body에 있는 경우 진행
        if (req.body['carNum', 'carModel', 'carYear', 'carSegment', 'carFuel', 'carRate', 'carImg', 'rentInsurance']) {
            // 동일한 차량번호가 이미 DB에 존재하는 지 확인
            if (await db['tb_car'].findOne({where: {car_num: req.body['carNum']}}) != null) {
                return res.status(400).json({message: 'carNum is already in use'});
            }

            // JWT에 적힌 userID를 통해 DB에서 usr_seq를 가져옴
            const user = await db['tb_user'].findOne({
                where: {usr_id: decodedUserToken.userId}
            });

            // DB tb_car테이블에 저장
            const car = await db['tb_car'].create({
                car_num: req.body['carNum'],
                car_img: req.file.path,
                car_rent_insurance_yn: req.body['rentInsurance'],
                car_reg_dt: Date.now(),
                car_model: req.body['carModel'],
                car_segment: req.body['carSegment'],
                car_fuel: req.body['carFuel'],
                car_rate: req.body['carRate'],
                usr_seq: user.usr_seq,
                car_year: req.body['carYear']
            });

            const justCreateCar = await db['tb_car'].findOne({
                where: {car_num: req.body['carNum']}
            });

            await db['tb_car_res_info'].create({
                car_seq: justCreateCar.car_seq,
                usr_seq: user.usr_seq,
                res_reg_dt: Date.now()
            });

            return res.status(200).json({statusCode: 0});
        }
        else {
            return res.status(400).json({statusCode: 1})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


// 보험가입 API mocking
router.post('/insurance', async(req, res) => {
    console.log(req.body);
    try {
        return res.status(200).json({insurance:'success'});
    } catch (error) {
        console.log(error);
        return res.status(400).json({insurance:'fail'});
    }
});


// 차량 임대 시간관리 API
router.get('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        let carTime = await db['tb_car_res_info'].findOne({
            where: {car_seq: req.params.carID}
        });
        if (carTime) {
            carTime.car_res_date_start.setHours(carTime.car_res_date_start.getHours() + 9);
            carTime.car_res_date_end.setHours(carTime.car_res_date_end.getHours() + 9);
            return res.status(200).json({
                car_res_date_start: carTime.car_res_date_start,
                car_res_date_end: carTime.car_res_date_end
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

router.patch('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (decodedUserToken && req.body['car_res_date_start', 'car_res_date_end']) {
            const ownerRequest = decodedUserToken.userId;
            const owner = await db['tb_car'].findOne({
                where: {usr_id: ownerRequest}
            });

            await db['tb_car_res_info'].update({ 
                car_res_date_start: req.body['car_res_date_start'], 
                car_res_date_end: req.body['car_res_date_end'],
                res_reg_dt: Date.now() }, {
                where: {
                    usr_seq: owner.usr_seq,
                    car_seq: req.params.carID
                }
            });

            return res.status(200).json({statusCode: 0});
        }
        else {
            return res.status(403).json({message: 'invalid jwt'});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


// 차량 상태관리 API
router.get('/:carID/info', async(req, res) => {
    console.log(req.body);
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

router.patch('/:carID/info', upload.single('car_img'), async(req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        // 받아온 carImg가 .png || .jpeg이 아닌 경우 에러
        if (req.file && req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
            return res.status(400).json({status_code: 1});
        }

        if (decodedUserToken) {
            const ownerRequest = await db['tb_user'].findOne({
                where: {usr_id: decodedUserToken.userId}
            });
            const owner = await db['tb_car'].findOne({
                where: {car_seq: req.params.carID}
            });

            if (req.file) {
                if (ownerRequest.usr_seq === owner.usr_seq) {
                    //  nullish coalescing을 통해 req.body에 있는 항목만 업데이트
                    await db['tb_car'].update({ 
                        car_num: req.body.car_num ?? undefined,
                        car_isValid: req.body.car_isValid ?? undefined,
                        car_rent_insurance_yn: req.body.car_rent_insurance_yn ?? undefined,
                        car_img: req.file.path ?? undefined,
                        car_reg_dt: Date.now(),
                        car_model: req.body.car_model ?? undefined,
                        car_segment: req.body.car_segment ?? undefined,
                        car_fuel: req.body.car_fuel ?? undefined,
                        car_rate: req.body.car_rate ?? undefined,
                        car_year: req.body.car_year ?? undefined }, {
                        where: {
                            usr_seq: owner.usr_seq,
                            car_seq: req.params.carID
                        }
                    });

                    return res.status(200).json({statusCode: 0});
                }
                else {
                    return res.status(400).json({message: 'jwt userID and DB userID does not match'})
                }
            }
            else {
                if (ownerRequest.usr_seq === owner.usr_seq) {
                    //  nullish coalescing을 통해 req.body에 있는 항목만 업데이트
                    await db['tb_car'].update({ 
                        car_num: req.body.car_num ?? undefined,
                        car_isValid: req.body.car_isValid ?? undefined,
                        car_rent_insurance_yn: req.body.car_rent_insurance_yn ?? undefined,
                        car_reg_dt: Date.now(),
                        car_model: req.body.car_model ?? undefined,
                        car_segment: req.body.car_segment ?? undefined,
                        car_fuel: req.body.car_fuel ?? undefined,
                        car_rate: req.body.car_rate ?? undefined,
                        car_year: req.body.car_year ?? undefined }, {
                        where: {
                            usr_seq: owner.usr_seq,
                            car_seq: req.params.carID
                        }
                    });

                    return res.status(200).json({statusCode: 0});
                }
                else {
                    return res.status(400).json({message: 'jwt userID and DB userID does not match'})
                }
            }
        }
        else {
            return res.status(400).json({message: 'Invalid jwt'});
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


// 차량 리뷰 API
router.get('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        const carReview = await db['tb_car_review'].findAll({
            where: {car_seq: req.params.carID}
        });
        if (carReview) {
            return res.status(200).json(carReview);
        }
        else {
            return res.status(404).json({statusCode: 2});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});

// 아래 POST/PATCH review 작업중...
router.post('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        if (decodedUserToken) {
            const userRequest = await db['tb_car_info'].findAll({
                where: {car_seq: req.params.carID, usr_seq: decodedUserToken.userId, res_end_valid: 'Y'}
            });
            

            return res.status(200).json({statusCode: 0});
        }
        else {
            return res.status(400).json({message: 'Invalid jwt'});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});

router.patch('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        return res.json({patchCarReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({patchCarReview:'fail'});
    }
});


// 차량 임대 내역 API
router.get('/:carID/history', async(req, res) => {
    console.log(req.body);
    try {
        let carInfoHistory = await db['tb_car_info'].findAll({
            where: {
                car_seq: req.params.carID,
                res_end_valid: 'Y'
            }
        });
        for (let i = 0; i < carInfoHistory.length; i++) {
            carInfoHistory[i].res_date_start.setHours(carInfoHistory[i].res_date_start.getHours() + 9);
            carInfoHistory[i].res_date_end.setHours(carInfoHistory[i].res_date_end.getHours() + 9);
            carInfoHistory[i].res_realtime_start.setHours(carInfoHistory[i].res_realtime_start.getHours() + 9);
            carInfoHistory[i].res_realtime_end.setHours(carInfoHistory[i].res_realtime_end.getHours() + 9);
        }
        return res.json(carInfoHistory);
    } catch (error) {
        console.log(error);
        return res.json({carHistory:'fail'});
    }
});

// JWT 유저 소유의 차량 목록
router.get('/mycar', async (req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        const owner = await db['tb_user'].findOne({
            where: {usr_id: decodedUserToken.userId}
        });

        const myCar = await db['tb_car'].findAll({
            where: {usr_seq: owner.usr_seq}
        });

        if (myCar) {
            return res.status(200).json(myCar);
        }
        else {
            return res.status(404).json({statusCode: 2})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


module.exports = router;