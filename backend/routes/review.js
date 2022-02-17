const express = require('express');
const db = require('../models/index');
const jwt = require('jsonwebtoken');
const router = express.Router();

process.env.JWT_SECRET = "secret";

// 모든 리뷰 목록 중 10개 추려옴
router.get('/', async (req, res) => {
    console.log(req.body);
    try {
        const review = await db['tb_car_review'].findAll({
            limit: 10
        });
        return res.status(200).json(review);
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});


// 특정 차량 리뷰 목록 API
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

// 특정 차량 리뷰 작성
router.post('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        const userId = await db['tb_user'].findOne({
            where: {usr_id: decodedUserToken.userId}
        });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});

// JWT 유저의 리뷰 목록
router.get('/myreview', async (req, res) => {
    console.log(req.body);
    try {
        const fullToken = req.headers['x-access-token'] || req.headers['authorization'] || req.headers['access_token'];
        const token = fullToken.replace(/^Bearer\s+/, "");
        const decodedUserToken = await jwt.verify(token, process.env.JWT_SECRET);

        const userId = await db['tb_user'].findOne({
            where: {usr_id: decodedUserToken.userId}
        });

        const myReview = await db['tb_car_review'].findAll({
            where: {usr_seq: userId.usr_seq}
        });
        return res.status(200).json({myReview});
    } catch (error) {
        console.log(error);
        return res.status(400).json({statusCode: 1});
    }
});



module.exports = router;