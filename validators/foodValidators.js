const joi = require("joi");

const foodSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be an empty string",
    "string.min": "Name must be at least 3 characters long",
  }),
  price: joi.number().positive().required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.positive": "Price must be a positive number",
  }),
  shop_id: joi.number().positive().required().messages({
    "any.required": "Shop ID is required",
    "number.base": "Shop ID must be a number",
    "number.positive": "Shop ID must be a positive number",
  }),
});

module.exports = { foodSchema };
