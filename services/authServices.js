import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';

const signup = async ({ email, password }) => {
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
  });
  return { email: newUser.email, subscription: newUser.subscription };
};

const findUser = async query => await User.findOne({ where: query });

const signin = async data => {
  const { email } = data;
  const user = await findUser({ email });
  if (!user) return user;
  const checkPassword = await bcrypt.compare(
    data.password,
    user.dataValues.password,
  );
  if (!checkPassword) return checkPassword;

  const token = jwt.sign({ id: user.dataValues.id }, process.env.SECRET_KEY, {
    expiresIn: '7d',
  });
  const result = await User.update(
    { token },
    { where: { email: data.email }, returning: true },
  );
  if (!result[0]) return result[0];
  const [updatedContact] = result[1];
  return updatedContact;
};

const signout = async id =>
  await User.update({ token: null }, { where: { id } });

export default {
  findUser,
  signup,
  signin,
  signout,
};
