import { ValidationError } from 'sequelize';
import HttpCode from '../helpers/HttpCode.js';

const ctrlWrapper = ctrl => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (e) {
      if (e instanceof ValidationError) {
        e.status = HttpCode[400].code;
      }
      next(e);
    }
  };
  return func;
};

export default ctrlWrapper;
