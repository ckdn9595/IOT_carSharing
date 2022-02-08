const multer = require('multer');
const path = require('path');

const upload = multer({
    storage:multer.diskStorage({
        // 폴더 위치 지정
        destination: (req,file,done) => {
            done(null, "uploads/")
        },

        filename: (req,file,done) => {
            console.log(file.originalname);
            const ext = path.extname(file.originalname);
            // aaa.txt => aaa+&&+129371271874.txt
            const filename = path.basename(file.originalname, ext)+Date.now()+ext;
            done(null, filename);
        }
    }),
    limits:{fileSize: 30*1024*1024}
})

module.exports = {upload};