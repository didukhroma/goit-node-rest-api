import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';

const findUser = async query => await User.findOne({ where: query });

const signUp = async (email, password) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
  });
  return { email: newUser.email, subscription: newUser.subscription };
};

const signOut = async id =>
  await User.update({ token: null }, { where: { id } });

const signIn = async data => {
  const { email } = data;
  const user = await findUser({ email });
  if (!user) return user;
  const checkPassword = await bcrypt.compare(
    data.password,
    user.dataValues.password,
  );
  if (!checkPassword) return checkPassword;

  const token = jwt.sign(
    { id: user.dataValues.id },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '7d',
    },
  );
  const result = await User.update(
    { token },
    { where: { email: data.email }, returning: true },
  );
  if (!result[0]) return result[0];
  const [updatedUser] = result[1];
  return updatedUser.dataValues;
};

const updateSubscription = async (id, subscription) => {
  const result = await User.update(
    { subscription },
    { where: { id }, returning: true },
  );
  if (!result[0]) return result[0];
  const [updatedUser] = result[1];
  return updatedUser.dataValues;
};

export default {
  findUser,
  signUp,
  signOut,
  signIn,
  updateSubscription,
};
