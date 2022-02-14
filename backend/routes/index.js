const express = require('express');
const userRouter = require('./user');
const carRouter = require('./car');
const mqtt = require('./mqtt');
const searchRouter = require('./search');

const router = express.Router();
// api/user 요청이 앞에 붙는다.
router.use("/api/user/", userRouter);
// api/car 요청이 앞에 붙는다.
router.use("/api/car/", carRouter);
// mqtt router
router.use("/api/mqtt/", mqtt);
// api/search 요청이 앞에 붙는다.
router.use("/api/search", searchRouter);

module.exports = router;