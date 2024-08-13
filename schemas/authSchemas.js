import Joi from 'joi';
import { emailRegex } from '../constants/authConstants.js';
import { subscriptionPlans } from '../constants/subscriptionPlans.js';

export const authSignUpSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required(),
  password: Joi.string().min(8).required(),
});

export const authSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionPlans)
    .required(),
});
