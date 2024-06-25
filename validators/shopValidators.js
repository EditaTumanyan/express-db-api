const joi = require("joi");

const shopSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be an empty string",
    "string.min": "Name must be at least 3 characters long",
  }),
});

module.exports = { shopSchema };
