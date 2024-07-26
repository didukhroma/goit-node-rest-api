import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'The name value only contain a-z, A-Z, and 0-9 symbols',
    'string.min': 'The name length must be at least 3 symbols',
    'string.max': 'The name length must be maximum 30 symbols',
    'any.required': 'Title must be exist',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required()
    .messages({
      'string.email': 'Email must be a valid with .com or .net domains',
      'any.required': 'Email must be exist',
    }),
  phone: Joi.string().min(9).max(15).required().messages({
    'string.min': 'The phone length must be at least 9 symbols',
    'string.max': 'The phone length must be maximum 15 symbols',
    'any.required': 'Phone must be exist',
  }),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).messages({
    'string.alphanum': 'The name value only contain a-z, A-Z, and 0-9 symbols',
    'string.min': 'The name length must be at least 3 symbols',
    'string.max': 'The name length must be maximum 30 symbols',
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .messages({
      'string.email': 'Email must be a valid with .com or .net domains',
    }),
  phone: Joi.string().min(9).max(15).messages({
    'string.min': 'The phone length must be at least 9 symbols',
    'string.max': 'The phone length must be maximum 15 symbols',
  }),
});
