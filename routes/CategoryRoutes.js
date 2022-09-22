const express = require("express")
const router = express.Router()

const authenticate = require("../helpers/authenticate")
const validateSchema = require("../helpers/validateSchema")
const categorySchema = require("../helpers/categorySchema")

const {
    getCategories,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/CategoryController")

router.get("/",getCategories)
router.post("/",[authenticate,validateSchema(categorySchema)],addCategory)
router.get("/:id",getCategory)
router.patch("/:id",[authenticate,validateSchema(categorySchema)],updateCategory)
router.delete("/:id",authenticate,deleteCategory)

module.exports = router