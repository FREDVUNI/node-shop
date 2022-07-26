const express = require("express")
const router = express.Router()

const {
    get_products,
    add_product,
    get_product,
    update_product,
    delete_product
} = require("../controllers/ProductController")

router.get("/",get_products)
router.post("/",add_product)
router.get("/:id",get_product)
router.update("/:id",update_product)
router.delete("/:id",delete_product)

module.exports = router