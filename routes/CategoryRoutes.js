const express = require("express")
const router = express.Router()

const {
    get_categories,
    add_category,
    get_category,
    update_category,
    delete_category
} = require("../controllers/CategoryController")

router.get("/",get_categories)
router.post("/",add_category)
router.get("/:id",get_category)
router.update("/:id",update_category)
router.delete("/:id",delete_category)

module.exports = router