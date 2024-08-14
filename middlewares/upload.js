import path from 'node:path';
import multer from 'multer';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

const destination = path.resolve('temp');

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.random(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
  const extension = file.originalname.split('.').pop();

  if (extension !== 'jpeg' && extension !== 'jpg') {
    return cb(HttpError(HttpCode[400].code, 'Allowed only jpeg-files'));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
