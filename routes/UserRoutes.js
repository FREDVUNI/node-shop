const express = require("express")
const router = express.Router()
const validateSchema = require("../helpers/validateSchema")
const {SignInSchema,SignUpSchema} = require("../helpers/userSchema")

const {
    get_users,
    signUp,
    signIn,
} = require("../controllers/UserController")

router.get("/",get_users)
router.post("/sign-up",validateSchema(SignUpSchema),signUp)
router.post("/sign-in",validateSchema(SignInSchema),signIn)

module.exports = router