const express = require('express');

const fs = require('fs');
const path = require('path');

const multer = require('multer');
// const {upload} = require('../utils/multer');
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + '_' + Date.now() + ext);
        }
    }),
    // limits: {fileSize: 10 * 1024 * 1024}
})

// api/car
const router = express.Router();


// 차량등록 API
router.post('/register', upload.single('carRegisterImage'), async(req, res) => {
    console.log(req.body);
    try {
        if (req.file.mimetype === 'image/png' || req.file.mimetype === 'image/jpg') {
            return res.json({carRegister:'success'})
        }
        else {
            return res.json({carRegister:'fail: Upload jpg/png file ONLY!'})
        }
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