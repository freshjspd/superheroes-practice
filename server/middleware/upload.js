const path = require('path');
const createHttpError = require('http-errors');
const { STATIC_FOLDER, IMAGES_FOLDER } = require('./../constants');

const multer = require('multer');

const storage = multer.diskStorage({
  // путь, куда сохранить файл
  destination: (req, file, cb) => {
    cb(null, path.join(STATIC_FOLDER, IMAGES_FOLDER));
  },
  // новое имя файла
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const fileFilter = (req, file, cb) => {
  const MIMETYPES = ['image/jpeg', 'image/gif', 'image/png'];

  // если тип допустимій, то сохраняем файл и данные
  if (MIMETYPES.some(mimetype => mimetype === file.mimetype)) {
    return cb(null, true);
  }
  // иначе генерируем ошибку и ничего не сохраняем
  cb(createHttpError(415, 'Support only jpej/gif/png file types'));
};

const upload = multer({ storage, fileFilter });

module.exports.uploadHeroFile = upload.single('heroPhoto');
