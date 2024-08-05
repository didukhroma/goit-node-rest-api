import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().min(9).max(15).required(),
  favorite: Joi.boolean().default(false),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
  phone: Joi.string().min(9).max(15),
  favorite: Joi.boolean().default(false),
});

export const updateContactStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
