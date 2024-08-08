import { DataTypes } from 'sequelize';
import { emailRegex } from '../../constants/authConstants.js';
import sequelize from '../sequelize.js';

const User = sequelize.define(
  'user',
  {
    password: {
      type: DataTypes.STRING,
      required: [true, 'Password is required'],
      allowNull: false,
      validate: {
        min: 8,
      },
    },
    email: {
      type: DataTypes.STRING,
      required: [true, 'Email is required'],
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        is: [emailRegex],
      },
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ['starter', 'pro', 'business'],
      defaultValue: 'starter',
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  },
);
// User.sync({ alter: true });
export default User;
