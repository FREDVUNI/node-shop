const express = require("express")
const router = express.Router()

const authenticate = require("../helpers/authenticate")
const validateSchema = require("../helpers/validateSchema")
const categorySchema = require("../helpers/categorySchema")

const {
    get_categories,
    add_category,
    get_category,
    update_category,
    delete_category
} = require("../controllers/CategoryController")

router.get("/",get_categories)
router.post("/",[authenticate,validateSchema(categorySchema)],add_category)
router.get("/:id",get_category)
router.patch("/:id",[authenticate,validateSchema(categorySchema)],update_category)
router.delete("/:id",authenticate,delete_category)

module.exports = router