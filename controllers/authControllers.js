import * as fs from 'node:fs/promises';
import path from 'node:path';

import ctrlWrapper from '../decorators/ctrlWrapper.js';
import HttpCode from '../helpers/HttpCode.js';
import HttpError from '../helpers/HttpError.js';

import sendEmail from '../helpers/sendEmail.js';
import authServices from '../services/authServices.js';

const avatarsPath = path.resolve('public', 'avatars');

const signup = async ({ body: { email, password } }, res) => {
  const newUser = await authServices.signUp(email, password);

  res.status(HttpCode[201].code).json({ user: newUser });
};

const signin = async (req, res) => {
  const user = await authServices.signIn(req.body);
  if (!user) throw HttpError(HttpCode[401].code, 'Email or password is wrong');
  if (user?.message) throw HttpError(HttpCode[400].code, user.message);

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
  { user: { id }, body: { subscription } },
  res,
) => {
  const data = { subscription };
  const query = { id };

  const updatedUser = await authServices.updateUser(query, data);

  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const updateAvatar = async (
  { user: { id }, file: { path: oldPath, filename } },
  res,
) => {
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  const avatarURL = path.join('avatars', filename);

  const data = {
    avatarURL,
  };
  const query = { id };
  const updatedUser = await authServices.updateUser(query, data);

  res.json({ avatarURL: updatedUser.avatarURL });
};

const verifyUser = async ({ params: { verificationToken } }, res) => {
  const user = await authServices.verifyUser(verificationToken);
  if (!user) {
    throw HttpError(HttpCode[404].code, 'User not found');
  }

  res.json({ message: 'Verification successful' });
};

const resendVerification = async ({ body: { email } }, res) => {
  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(HttpCode[404].code, 'Email not found');
  }

  const {
    dataValues: { verify, email: userEmail, verificationToken },
  } = user;
  if (verify) {
    throw HttpError(HttpCode[400].code, 'Verification has already been passed');
  }
  await sendEmail(userEmail, verificationToken);
  res.json({ message: 'Verification email sent' });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  signout: ctrlWrapper(signout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyUser: ctrlWrapper(verifyUser),
  resendVerification: ctrlWrapper(resendVerification),
};
