const joi  = require("joi");

const notificationSchema = joi.object({
    email: joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email": "Email must be a valid email",
    }),
    text: joi.string().required().messages({
        "any.required": "Text is required",
        "string.empty": "Text cannot be an empty string",
    }),
    scheduleDate: joi.date().required().messages({
        "any.required": "Schedule date is required",
        "date.base": "Schedule date must be a date",
    }),
});

module.exports = { notificationSchema }