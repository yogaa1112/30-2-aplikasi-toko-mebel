const multer = require('multer');
const path = require('path');

//Penyimpanan images
const storage = multer.diskStorage({
    filename: (req, file, cb)=>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

module.exports = upload;
