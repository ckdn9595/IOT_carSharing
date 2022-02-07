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
        const decodedUserToken = await jwt.verify(req.body['userToken'], process.env.JWT_SECRET);

        if (decodedUserToken) {
            if (decodedUserToken.exp < Date.now()/1000) {
                return res.status(400).json({message: 'jwt expired'});
            }
        }
        else {
            return res.status(400).json({message: 'invalid jwt'});
        }

        // 받아온 carImg가 .png || .jpeg이 아닌 경우 에러
        if (req.file.mimetype !== 'image/png' && req.file.mimetype !== 'image/jpeg') {
            return res.status(400).json({status_code: 1});
        }

        // 필요한 항목이 모두 req.body에 있는 경우 진행
        if (req.body['userToken', 'carNum', 'carModel', 'carYear', 'carSegment', 'carFuel', 'carRate', 'carImg', 'rentInsurance']) {
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
            return res.status(200).json({status_code: 0});
        }
        else {
            return res.status(400).json({status_code: 1})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({status_code: 1});
    }
});


// 보험가입 API
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
        return res.json({getCarTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({getCarTime:'fail'});
    }
});

router.post('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({postCarTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({postCarTime:'fail'});
    }
});

router.patch('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({patchCarTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({patchCarTime:'fail'});
    }
});


// 차량 상태관리 API
router.get('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({getCarInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({getCarInfo:'fail'});
    }
});

router.post('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({postCarInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({postCarInfo:'fail'});
    }
});

router.patch('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({patchCarInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({patchCarInfo:'fail'});
    }
});


// 차량 리뷰 API
router.get('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({getCarReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({getCarReview:'fail'});
    }
});

router.post('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({postCarReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({postCarReview:'fail'});
    }
});

router.patch('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
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
        return res.json({carHistory:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carHistory:'fail'});
    }
});


module.exports = router;