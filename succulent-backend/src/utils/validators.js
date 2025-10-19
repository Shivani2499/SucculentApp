import Joi from "joi";

// Registration validation schema
export const registerSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Login validation schema
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
