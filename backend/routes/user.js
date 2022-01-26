const e = require('express');
const express = require('express');
const db = require('../models/index')
const {hashPassword, comparePassword} = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')
const {verifyToken} = require('../utils/jwt')
const {upload} = require('../utils/multer')
const fs = require('fs');

const router = express.Router();

// 회원가입
router.post('/register', async(req, res) => {
    console.log(req.body);
    try {
        return res.json({register:'success'});
    } catch (error) {
        console.log(error);
        return res.json({register:'fail'});
    }
});

// 로그인
router.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        return res.json({login:'success'});
    } catch (error) {
        console.log(error);
        return res.json({login:'fail'});
    }
});

// 유저 정보
router.get('/info', async (req, res) => {
    console.log(req.body);
    try {
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