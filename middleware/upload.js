const multer = require("multer");
const path =  require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
      cb(null, file.originalname + '-' +Date.now()+ext);
    }
  });
  
  const upload = multer({ storage: storage })


module.exports = upload