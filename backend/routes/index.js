const express = require('express');
const userRouter = require('./user');

const router = express.Router();
// api/user 요청이 앞에 붙는다.
router.use("/api/user/", userRouter);

module.exports = router;