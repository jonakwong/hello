//Validation
const Joi = require('joi');
//Register Validation
const registerValidation = (data) => {
    const schema = Joi.object({
        fullName: Joi.string()
            .min(6),
        username: Joi.string()
            .min(6)
            .required(),
        phonenumber: Joi.string()
            .length(8)
            .pattern(/^[0-9]+$/),
        password: Joi.string()
            .min(6)
            .required(),

    });
    return schema.validate(data)
}

//Login Validation
const loginValidation = (data) => {
    const schema = Joi.object({

        username: Joi.string()
            .min(6)
            .required(),

        password: Joi.string()
            .min(6)
            .required(),

    });
    return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation