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
  const MIMETYPES = ['image/jpeg', 'image/gif', 'image/png'];

  cb(
    null,
    MIMETYPES.some(mimetype => mimetype === file.mimetype)
  );
};

const upload = multer({ storage, fileFilter });

module.exports.uploadHeroFile = upload.single('heroPhoto');
