const express = require("express")
const router = express.Router()

const {
    get_users,
    signUp,
    signIn,
} = require("../controllers/UserController")

router.get("/",get_users)
router.post("/",signUp)
router.post("/",signIn)

module.exports = router