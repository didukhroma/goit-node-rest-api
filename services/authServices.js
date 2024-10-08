import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../db/models/User.js';
import createAvatar from '../helpers/createAvatar.js';

const findUser = async query => await User.findOne({ where: query });

const updateUser = async (query, data, returning = true) => {
  const result = await User.update({ ...data }, { where: query, returning });
  if (!result[0]) return result[0];
  const [updatedUser] = result[1];
  return updatedUser.dataValues;
};

const signUp = async (email, password) => {
  const avatarURL = createAvatar(email);
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });
  return { email: newUser.email, subscription: newUser.subscription };
};

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
      expiresIn: '24h',
    },
  );

  const userData = { token };
  const query = { email };
  const updatedUser = await updateUser(query, userData);
  return updatedUser;
};

const signOut = async id => {
  const data = { token: null };
  const query = { id };
  await updateUser(query, data);
};

export default {
  findUser,
  updateUser,
  signUp,
  signIn,
  signOut,
};
