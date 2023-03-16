const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/img")
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
})

const uploader = multer({storage})

module.exports = uploader