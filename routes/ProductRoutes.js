const express = require("express")
const router = express.Router()
const cloudinary = require("cloudinary")
const multer = require("multer")
const {unlink} = require('fs');

const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const authenticate = require("../helpers/authenticate")
const validateSchema = require("../helpers/validateSchema")
const productSchema = require("../helpers/productSchema")

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.API_SECRET,
})

const storage = multer.diskStorage({})
const upload = multer({storage})

const {
    get_products,
    get_product,
    update_product,
    delete_product
} = require("../controllers/ProductController")

router.get("/",get_products)

router.post("/",upload.single("image"),[authenticate,validateSchema(productSchema)],async(req,res)=>{
    try{
        const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'shop'})
        const products = await prisma.product.findUnique({
            where:{ 
                product:req.body.product 
            }  
        })

        if(!products){
            await prisma.product.create({
                data: {
                    product:req.body.product,
                    price:req.body.price,
                    description:req.body.description,
                    image:result.url,
                    categoryId:Number(req.body.categoryId)
                }
            })
            res.status(200).json({message:"Product has been created."})
        }else{
            res.status(400).json(`This product already exists.`)
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
})

router.patch("/:id",upload.single("image"),[authenticate,validateSchema(productSchema)],async(req,res)=>{
    try{
        const id = req.params.id
        const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:'shop'})
        const products = await prisma.product.findUnique({
            where:{ 
                product:req.body.product 
            }  
        })

        if(!products){
            unlink(req.file.path,(err)=>{
                if(err) return res.status(500).json('failed to delete file');
            });
            await prisma.product.update({
                data: {
                    product:req.body.product ? req.body.product: products.product,
                    price:req.body.price ? req.body.price: products.price,
                    description:req.body.description ? req.body.description: products.description,
                    image:result.url ? result.url : products.image,
                    categoryId:Number(req.body.categoryId) ? Number(req.body.categoryId): products.categoryId
                },
                where:{
                    id:Number(id)
                },
            })
            res.status(200).json({message:"Product has been updated."})
        }else{
            res.status(400).json(`This product already exists.`)
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
})

router.get("/:id",get_product)
router.patch("/:id",[authenticate,validateSchema(productSchema)],update_product)


router.delete("/:id",authenticate,async(req,res)=>{
    try{
        const id = req.params.id

        const productId = await prisma.product.findUnique({
            where:{ 
                id:Number(id) 
            }  
        })
        if(!productId) return res.status(404).json("The product id does not exist.")

        const product = await prisma.product.delete({
            where:{
                id:Number(id)
            },
        })
        if(product){
            res.status(200).json({message:"Product has been deleted."})
        }else{
            res.status(404).json("The product id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
})

module.exports = router