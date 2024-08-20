import Joi from "joi";

const validateSignUp = (data) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(50).required().messages({
      "string.base": "Full name should be a string.",
      "string.min": "Full name should be at least 3 characters long.",
      "string.max": "Full name should be less than or equal to 50 characters.",
      "any.required": "Full name is required.",
    }),
    username: Joi.string().alphanum().min(3).max(30).required().messages({
      "string.base": "Username should be a string.",
      "string.alphanum":
        "Username should only contain alphanumeric characters.",
      "string.min": "Username should be at least 3 characters long.",
      "string.max": "Username should be less than or equal to 30 characters.",
      "any.required": "Username is required.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Enter valid email address.",
      "any.required": "Email is required.",
    }),
    password: Joi.string()
      .min(8)
      .max(100)
      .required()
      .pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.base": "Password should be a string.",
        "string.min": "Password must be at least 8 characters long.",
        "string.max": "Password must be less than or equal to 100 characters.",
        "string.pattern.base":
          "Password must include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
        "any.required": "Password is required.",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
export default validateSignUp;

export const validateLogin = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().messages({
      "any.required": "username or email is required",
    }),
    password: Joi.string().min(8).required().messages({
      "any.required": "password is required",
    }),
  });

  const result = schema.validate(body);
  return result;
};
