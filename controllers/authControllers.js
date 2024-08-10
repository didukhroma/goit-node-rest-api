import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

import authServices from '../services/authServices.js';

const signup = async (req, res) => {
  const newUser = await authServices.signup(req.body);
  res.status(HttpCode[201].code).json({ user: newUser });
};

const signin = async (req, res) => {
  const user = await authServices.signin(req.body);
  if (!user) throw HttpError(HttpCode[401].code, 'Email or password is wrong');

  const {
    dataValues: { token, email, subscription },
  } = user;
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const signout = async (req, res) => {
  await authServices.signout(req.user.id);
  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
};
