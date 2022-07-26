const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const signUp = async(req,res) =>{
    try{
        let salt = await bcrypt.genSalt(10)
        let password_hash = await bcrypt.hash(req.body.password,salt)

        const users = await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })

        if(!users){
            const new_user = await prisma.user.create({
                data:{
                    username:req.body.username,
                    email:req.body.email,
                    password:password_hash
                } 
            })
            res.status(200).json({
                message:"user has been created.",
                token:jwt.sign(new_user,process.env.SECRET_KEY)
            })
        }else{
            res.status(400).json(`User with email ${req.body.email} already exists.`)
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const signIn = async(req,res) =>{
    try{
        const users = await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })
        if(!users) res.status(400).json("Invalid email password combination")

        const passwordCheck = await bcrypt.compare(req.body.password,users.password)
        if(!passwordCheck) res.status(400).json("Invalid email password combination")

        const user = jwt.sign({
            id:users.id,name:users.name,email:users.email
        },process.env.SECRET_KEY)

        res.status(200).json({
            token:user
        })
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const get_users = async(req,res) =>{
    try{
        const users = await prisma.user.findMany({})
        res.status(200).json({
            data: users
        })
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

module.exports = {
    signIn,
    signUp,
    get_users
}