import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

import authServices from '../services/authServices.js';

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(HttpCode[201].code).json({ user: newUser });
};

export default {
  signup: ctrlWrapper(signup),
};
