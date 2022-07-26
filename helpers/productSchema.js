const joi = require("joi")

const productSchema = joi.object({
    product: joi.string().required().min(3).max(180), 
    price: joi.string().required().min(1),
    description: joi.string().required().min(10).max(450),
    categoryId: joi.number().required().min(1).max(30),
})


module.exports = productSchema

