const joi = require("joi")

const userSchema = joi.object({
    name:joi.string().max(200).min(3).required(),
    email:joi.string().max(200).min(3).email().required(),
    password:joi.string().max(200).min(3).required(),
})

module.exports = userSchema