const express = require('express');
const app = express();

// /api/car/
const router = express.Router();


// 차량등록 API
router.post('/register', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carRegister:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carRegister:'fail'});
    }
});


// 보험가입 API
router.post('/insurance', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({insurance:'success'});
    } catch (error) {
        console.log(error);
        return res.json({insurance:'fail'});
    }
});


// 차량 임대 시간관리 API
router.get('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carTime:'fail'});
    }
});

router.post('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carTime:'fail'});
    }
});

router.patch('/:carID/time', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carTime:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carTime:'fail'});
    }
});


// 차량 상태관리 API
router.get('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carInfo:'fail'});
    }
});

router.post('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carInfo:'fail'});
    }
});

router.patch('/:carID/info', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carInfo:'fail'});
    }
});


// 차량 리뷰 API
router.get('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carReview:'fail'});
    }
});

router.post('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carReview:'fail'});
    }
});

router.patch('/:carID/review', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({carReview:'success'});
    } catch (error) {
        console.log(error);
        return res.json({carReview:'fail'});
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