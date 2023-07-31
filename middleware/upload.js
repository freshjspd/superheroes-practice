const multer = require('multer');

const storage = multer.diskStorage({
  // путь, куда сохранить файл
  destination: (req, file, cb) => {
    cb(null, 'public/images/');
  },
  // новое имя файла
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  cb(
    null,
    file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/gif' ||
      file.mimetype === 'image/png'
  );
};

const upload = multer({ storage, fileFilter });

module.exports.uploadHeroFile = upload.single('heroPhoto');
