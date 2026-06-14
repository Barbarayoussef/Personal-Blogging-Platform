import joi from "joi";

export const registerSchema = joi.object({
  name: joi.string().min(3).required(),
  email: joi.string().email().required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and contain at least one uppercase letter and one number.",
    }),
  confirmPassword: joi.string().valid(joi.ref("password")).required().messages({
    "any.only": "Passwords do not match.",
  }),
});

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
