import bcrypt from 'bcryptjs';
import User from '../db/models/User.js';
import HttpCode from '../helpers/HttpCode.js';

const signup = async ({ email, password }) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashPassword,
    });
    return { email: newUser.email, subscription: newUser.subscription };
  } catch (error) {
    if (error.parent.code === '23505') {
      error.message = 'Email in use';
    }
    throw error;
  }
};

export default {
  signup,
};
