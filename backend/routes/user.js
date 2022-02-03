const e = require('express');
const express = require('express');
const db = require('../models/index')
const {hashPassword, comparePassword} = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')
const {verifyToken} = require('../utils/jwt')
const {upload} = require('../utils/multer')
const fs = require('fs');

const router = express.Router();

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
        if(userName==null || userGender==null || userBirth==null || userPhone==null || userDriverLicense==null || userPrivacyPolicy==null || userLocationBasedService==null){
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
                process.env.JWT_SECRET = user.usr_id;
                // generate token
                const token = jwt.sign({
                    userId: user.usr_id,
                    userName: user.usr_name,
                    userGender: user.usr_gender
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
});

// user info function
router.get('/info', async (req, res) => {
    console.log(req.body);
    try {
        const {
            userToken
        } = req.body;
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
});

// 유저 면허 등록
router.post('/license', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
});

// 유저 평점
router.get('/:userID/grade', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userGrade:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userGrade:'fail'});
    }
})

// 유저 채팅
router.get('/:userID/chat', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userChat:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userChat:'fail'});
    }
})

// 채팅방 상세
router.post('/:userID/chat/:chatID', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userInfo:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userInfo:'fail'});
    }
})

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
router.post('/info', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({userQuestionSpec:'success'});
    } catch (error) {
        console.log(error);
        return res.json({userQuestionSpec:'fail'});
    }
})

// 이용요금 관리
router.post('/payment', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({payment:'success'});
    } catch (error) {
        console.log(error);
        return res.json({payment:'fail'});
    }
})

// // 유저 정보
// router.get('/:id', async (req, res) => {
//     console.log(req.params.id);
//     try {
//         const result = await db['user'].findOne({
//             attributes: [
//                 "id",
//                 "name",
//                 "email",
//                 "profile",
//                 "type",
//                 "createdAt",
//                 "updatedAt",
//                 "deletedAt"
//             ],
//             where: {
//                 id: req.params.id
//             }
//         });
//         console.log(result);
//         return res.json(result);
//     } catch (error) {
//         console.log(error);
//         return res.json({ Error: error });
//     }
// })

// // 유저 회원가입
// router.post('/', async (req, res) => {
//     // console.log(req.body);
//     try {
//         const { name, email, password, type } = req.body;
//         const hashedPassword = await hashPassword(password);
//         const result = await db["user"].create({
//             name,
//             email,
//             password: hashedPassword,
//             type
//         })
//         console.log(result)
//         return res.json({ status: "OK" });
//     } catch (error) {
//         console.log(error);
//     }

// })

// // verifyToken을 한다는건 token에 대한 검증이 필요하기 때문이다.
// // 따라서 검증이 필요하다는 것은? 로그인시에만 동작해아 한다.
// // verifyToken을 통해 middleware로 지나간다.
// // 유저 정보 수정
// router.patch('/:id', verifyToken, async (req, res) => {
//     try {
//         // 유저 정보를 수정하기 위해서
//         // password를 받아와서 검증
//         // 검증에 성공했을 경우에만 업데이트를 허용시킨다.
//         // 유저 정보에서 name, type을 변경하기
//         const { id } = req.params;

//         const userInformation = await db['user'].findOne({
//             where: {
//                 id: id
//             }
//         });
//         if (userInformation) {
//             console.log(userInformation.dataValues);
//             // 비밀번호 검증
//             const passwordResult = await comparePassword(req.body.password, userInformation.dataValues.password);
//             if (passwordResult) {
//                 const update = await db['user'].update({
//                     name: req.body.name,
//                     type: req.body.type,
//                 }, {
//                     where: {
//                         id: id
//                     }
//                 })
//                 return res.json({ status: "OK" });
//             } else {
//                 // try catch의 error로 들어가짐
//                 throw new Error();
//             }
//         } else {
//             console.log("no data");
//         }

//     } catch (error) {
//         console.log(error);
//         return res.json({ status: "ERROR" });
//     }
// })

// // 프로필 업로드
// router.post("/:id/profile", upload.single("profile"), async (req, res) => {
//     try {
//         return res.json({ stauts: "OK" });
//     } catch {
//         return res.json({ status: "ERROR" });
//     }
// })

// // 회원 탈퇴
// router.delete('/:id', async (req, res) => {
//     try {
//         const result = await db['user'].destroy({
//             where: {
//                 id: req.params.id
//             }
//         })


//         return res.json({ status: "OK" })
//     } catch (error) {
//         console.log(error);
//         return res.json({ status: "ERROR" });
//     }
// })

// // 로그인
// router.post('/login', async (req, res) => {
//     // DB에서 로그인 정보 검증
//     // JWT 발행
//     // JWT 전달
//     // JWT를 Cookie localstorage session storage에 저장
//     // 요청이 있을때마다 Header에 JWT를 담아서 전달
//     // JWT가 유효한지 판별
//     try {
//         // console.log(req.body)
//         const { email, password } = req.body;

//         const userData = await db["user"].findOne({
//             attributes: ["id", "password", "name"],
//             where: {
//                 email: email
//             }
//         })

//         const hashedPassword = userData.dataValues.password;

//         const compareResult = await comparePassword(password, hashedPassword)
//         console.log(compareResult)
//         if (compareResult) {
//             // jwt.sign(정보, 두번째는 암호화 하기위한 비밀번호, 옵션)
//             const token = jwt.sign({
//                 id: userData.dataValues.id
//             }, "ssafy", { expiresIn: "24h" })
//             // express-session에서 저장하는 방법도 있고
//             // res.cookie에서 저장하는 방법도 있고
//             // 지금방식은 token을 return해서 front에서 (local, cookie)에서 저장
//             return res.json({ resultCode: 200, token:token, id:userData.dataValues.id, name:userData.dataValues.name})
//         }
//     } catch (error) {
//         console.log(error);
//         return res.json({ status: "ERROR" })
//     }
// })

// // 검증하는 역할

module.exports = router;