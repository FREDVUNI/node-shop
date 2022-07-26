const joi = require("joi")

const categorySchema = () =>{
    joi.object({
        category: joi.string().required().min(3).max(30)
    })
}

module.exports = categorySchema
