const joi = require("joi")

const SignUpSchema = joi.object({
    username:joi.string().max(200).min(3).required(),
    email:joi.string().max(200).min(3).email().required(),
    password:joi.string().max(200).min(3).required(),
})

const SignInSchema = joi.object({
    email:joi.string().max(200).min(3).email().required(),
    password:joi.string().max(200).min(3).required(),
})

module.exports = {SignUpSchema,SignInSchema}