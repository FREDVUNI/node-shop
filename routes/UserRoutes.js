const express = require("express")
const router = express.Router()
const authenticate = require("../helpers/authenticate")
const validateSchema = require("../helpers/validateSchema")
const {SignInSchema,SignUpSchema} = require("../helpers/userSchema")

const {
    getUsers,
    signUp,
    signIn,
} = require("../controllers/UserController")

router.get("/",authenticate,getUsers)
router.post("/signup",validateSchema(SignUpSchema),signUp)
router.post("/login",validateSchema(SignInSchema),signIn)

module.exports = router