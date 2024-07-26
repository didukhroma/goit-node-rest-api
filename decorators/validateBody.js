import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

const validateBody = schema => {
  const func = (req, _, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(HttpCode[400].code, error.message));
    }
    next();
  };

  return func;
};

export default validateBody;
