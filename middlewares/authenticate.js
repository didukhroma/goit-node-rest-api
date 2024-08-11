import jwt from 'jsonwebtoken';

import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';
import authServices from '../services/authServices.js';

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(HttpCode[401].code, 'Authorization header missing'));
  }
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    return next(HttpError(HttpCode[401].code, 'Bearer missing'));
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await authServices.findUser({ id });

    if (!user) return next(HttpError(HttpCode[401].code));

    if (!user.dataValues.token || user.dataValues.token !== token) {
      return next(HttpError(HttpCode[401].code));
    }
    req.user = user.dataValues;
    next();
  } catch (error) {
    next(HttpError(HttpCode[401].code));
  }
};

export default authenticate;
