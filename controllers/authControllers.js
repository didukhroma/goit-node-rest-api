import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

import authServices from '../services/authServices.js';

const signup = async ({ body: { email, password } }, res) => {
  const newUser = await authServices.signUp(email, password);
  res.status(HttpCode[201].code).json({ user: newUser });
};

const signin = async (req, res) => {
  const user = await authServices.signIn(req.body);
  if (!user) throw HttpError(HttpCode[401].code, 'Email or password is wrong');

  const { token, email, subscription } = user;

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const signout = async ({ user: { id } }, res) => {
  await authServices.signOut(id);
  res.status(204).json();
};

const current = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const updateSubscription = async (
  { user: { id }, body: { subscription: newSubscription } },
  res,
) => {
  const updatedUser = await authServices.updateSubscription(
    id,
    newSubscription,
  );

  const { email, subscription } = updatedUser;
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
  updateSubscription: ctrlWrapper(updateSubscription),
};
