const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/img');//куда сохраняется
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`// уникальное имя
    );
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});



module.exports = upload;
