const joi = require("joi")

const productSchema = () =>{
    joi.object({
        product: joi.string().required().min(3).max(30),
        price: joi.number().required().min(1),
        description: joi.string().required().min(10).max(250),
        categoryId: joi.number().required().min(1).max(30),
    })
}

module.exports = productSchema

