import Joi from 'joi';
import { emailRegex } from '../constants/authConstants.js';

export const authSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});
