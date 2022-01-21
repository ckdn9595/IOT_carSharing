const express = require('express');
const userRouter = require('./user');
const carRouter = require('./car');

const router = express.Router();
// api/user 요청이 앞에 붙는다.
router.use("/api/user/", userRouter);
// api/car 요청이 앞에 붙는다.
router.use("/api/car/", carRouter);

module.exports = router;