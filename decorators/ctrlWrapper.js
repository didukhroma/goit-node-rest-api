import { ValidationError } from 'sequelize';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (e) {
      if (e?.parent?.code === '23505') {
        e.message = 'Email in use';
        return next(HttpError(HttpCode[409].code, e.message));
      }
      if (e instanceof ValidationError) {
        e.status = HttpCode[400].code;
        return next(HttpError(HttpCode[400].code, e.message));
      }
      next(e);
    }
  };
  return func;
};

export default ctrlWrapper;
