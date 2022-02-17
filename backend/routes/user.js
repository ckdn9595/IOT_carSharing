const e = require('express');
const express = require('express');
const db = require('../models/index')
const {hashPassword, comparePassword} = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')
const {verifyToken} = require('../utils/jwt')
const {upload} = require('../utils/multer')
const fs = require('fs');
const router = express.Router();

process.env.JWT_SECRET = "secret";

// register function
router.post('/register', async(req, res) => {
    console.log(req.body);
    try {
        const { // destructuring assignment for each variable
            userId,
            userName,
            userPassword,
            userGender,
            userBirth,
            userPhone,
            userDriverLicense,
            userDriverInsurance,
            userPrivacyPolicy,
            userLocationBasedService
        } = req.body;
        let seqNum;

        // check if all values are filled
        if(userId==null || !userId.includes('@') || !userId.includes('.')){
            return res.status(400).json({
                message: 'userId is required and must be email format'
            });
        }
        if(userPassword==null || userPassword.length<8){
            return res.status(400).json({
                message: 'userPassword is required and must be 8 characters at least'
            });
        }
        if(userName==null || userGender==null || userBirth==null || userPhone==null ||  userPrivacyPolicy==null || userLocationBasedService==null){
            return res.status(400).json({
                message: 'fill all the required fields'
            });
        }

        // userId duplication check
        if(await db.tb_user.findOne({where: {usr_id : userId}}) != null){
            return res.status(400).json({
                message: 'userId is already used'
            });
        }

        // hash userPassword
        const hashedPassword = await hashPassword(userPassword);

        // create user
        const user = await db.tb_user.create({
            usr_id: userId,
            usr_pwd: hashedPassword,
            usr_name: userName,
            usr_gender: userGender,
            usr_phone: userPhone,
            usr_birth_day: userBirth,
            usr_ps_info_proc_agmt_yn: userPrivacyPolicy,
            usr_loc_base_svc_agmt_yn: userLocationBasedService,
        });

        // return success message
        return res.status(200).json({
            register:'success'
        });
    } catch (error) { // catch error
        console.log(error);
        return res.json({register:error});
    }
}); // end of register function

// login function
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const {
            userId,
            userPassword
        } = req.body;

        // check if all values are filled
        if(userId==null || !userId.includes('@') || !userId.includes('.')){
            return res.status(400).json({
                message: 'userId is required and must be email format'
            });
        };


        // check if userId is registered
        const user = await db.tb_user.findOne({where: {usr_id: userId}});
        if(user == null){
            
            return res.status(400).json({
                message: 'userId is not registered'
            });
        } else {
            
            // check if userPassword is correct
            const isCorrect = await comparePassword(userPassword, user.usr_pwd);
            if(isCorrect){
                // generate token
                const token = jwt.sign({
                    userId: user.usr_id
                }, process.env.JWT_SECRET, {
                    expiresIn: '1h'
                });
                return res.status(200).json({
                    message: 'login success',
                    token: token
                });
            } else {
                return res.status(400).json({
                    message: 'userPassword is incorrect'
                });
            }
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({login:error});
    }
}); // end of login function

// GET user info function
router.get('/info', async (req, res) => {
    console.log(req.body);
    try {
        // get token from header
        let userToken = req.headers['access_token'] || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
        if(userToken.search(/^Bearer\s+/) !== -1){
            userToken = userToken.replace(/^Bearer\s+/,'');
        }
        
        // check if userId is registered
        const decodedUserToken = await jwt.verify(userToken, process.env.JWT_SECRET);

        if(decodedUserToken == null){
            return res.status(400).json({
                message: 'invailed token'
            });
        } else if (decodedUserToken.exp < Date.now()/1000){
            return res.status(400).json({
                message: 'token expired'
            });
        } else {
            // get user info from db
            const userInfo = await db.tb_user.findOne({where: {usr_id: decodedUserToken.userId}});
            return res.status(200).json({
                message: 'user info',
                userSeq: userInfo.usr_seq,
                userId: userInfo.usr_id,
                userName: userInfo.usr_name,
                userGender: userInfo.usr_gender,
                userBirth: userInfo.usr_birth_day,
                userPhone: userInfo.usr_phone
            });
        };
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            userInfo:error
        });
    }
}); // end of GET user info function

// post user info function
router.post('/info', async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        const {
            userPassword,
            userPhone
        } = req.body;
        const userToken = req.header('access_token') || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
        if(userToken.indexOf(/^Bearer\s+/) !== -1){
            userToken = userToken.replace(/^Bearer\s+/,'');
        }

        // compare userToken
        const decodedUserToken = await jwt.verify(userToken, process.env.JWT_SECRET);
        if(decodedUserToken){
            // check if all values are filled
            if(userPhone==null){
                return res.status(400).json({
                    message: 'fill all the required fields'
                });
            } else {
                const userInfo = await db.tb_user.findOne({where: {usr_id: decodedUserToken.userId}});
                // update user info
                if(userPassword==null){
                    await db.tb_user.update({ // update user info
                        usr_phone: userPhone,
                    }, {where: {usr_id: decodedUserToken.userId}});
                    return res.status(200).json({
                        message: 'user info updated'
                    });
                } else if (userPassword!=null){
                    // hash userPassword
                    const hashedPassword = await hashPassword(userPassword);

                    await db.tb_user.update({ // update user info
                        usr_phone: userPhone,
                        usr_befo_pwd: userInfo.usr_pwd,
                        usr_pwd: hashedPassword
                    }, {where: {usr_id: decodedUserToken.userId}});
                    return res.status(200).json({
                        message: 'user info updated'
                    });
                }
                
            }
        } else {
            return res.status(400).json({
                message: 'userToken is incorrect or expired'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            userInfo:error
        });
    }
}); // end of post user info function

// user driver license function
router.post('/license', async (req, res) => {
    console.log(req.body);
    try {
        // Mocking
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
}); // end of user driver license function

// user grade function
router.get('/:userID/grade', async (req, res) => {
    console.log(req.body);
    try {
        // get grade from db
        const user = await db.tb_car.findAll({where: {car_owner: req.params.userID}});

        return res.json({userGrade:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userGrade:'fail'});
    }
}); // end of user grade function

// GET user chatting list function
router.get('/:userID/chat', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userChat:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userChat:'fail'});
    }
}); // end of GET user chatting list function

// GET user chatting function
router.get('/:userID/chat/:chatID', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
}); // end of GET user chatting function

// POST user chatting function
router.post('/:userID/chat/:chatID', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
}); // end of POST user chatting function

// 문의내역
router.post('/:userID/question', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userQuestion:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userQuestion:'fail'});
    }
})

// 문의내역 상세
router.post('/:userID/question/:questionID', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userQuestionSpec:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userQuestionSpec:'fail'});
    }
})

// post payment function
router.post('/payment', async (req, res) => {
    console.log(req.body);
    try {
        const {
            cardNum,
            cardDate,
            cardCvc,
        } = req.body;
        const userToken = req.header('access_token') || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
        if(userToken.indexOf(/^Bearer\s+/) !== -1){
            userToken = userToken.replace(/^Bearer\s+/,'');
        }
        // compare userToken
        const decodedUserToken = await jwt.verify(userToken, process.env.JWT_SECRET);
        if(decodedUserToken){
            const tempUser = await db.tb_user.findOne({where: {usr_id: decodedUserToken.userId}});
            await db.tb_payment.create({
                usr_seq: tempUser.usr_seq,
                card_num: cardNum,
                card_date: cardDate,
                card_cvc: cardCvc,
                card_aprv: 'Y',
                card_comp: "samsung"
            });
            return res.status(200).json({payment:'success'});
        } else {
            return res.status(400).json({
                message: 'userToken is incorrect or expired'
            })
        }
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({"error":error});
    }
}) // end of post payment function

// get payment function
router.get('/payment', async (req, res) => {
    console.log(req.body);
    try {
        const userToken = req.header('access_token') || req.headers['x-access-token'] || req.headers['authorization'] || req.headers['Authorization'];
        if(userToken.indexOf(/^Bearer\s+/) !== -1){
            userToken = userToken.replace(/^Bearer\s+/,'');
        }
        // compare userToken
        const decodedUserToken = await jwt.verify(userToken, process.env.JWT_SECRET);
        if(decodedUserToken){
            const tempUser = await db.tb_user.findOne({where: {usr_id: decodedUserToken.userId}});
            const tempPayment = await db.tb_payment.findOne({where: {usr_seq: tempUser.usr_seq}});
            return res.status(200).json({tempPayment});
        } else {
            return res.status(400).json({
                message: 'userToken is incorrect or expired'
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({"error":error});
    }
}) // end of get payment function

module.exports = router;
