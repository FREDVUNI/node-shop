const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {unlink} = require('fs');

const getProducts = async(req,res) =>{
    try{
        const products = await prisma.product.findMany({
            include:{category:true}
        })
        res.status(200).json(products)
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const addProduct = async(req,res) =>{
    try{
        const {product,price,description,image,categoryId} = req.body
        const products = await prisma.product.findUnique({
            where:{
                product:req.body.product
            }
        })

        if(!products){
            await prisma.product.create({
                data: {
                    product,
                    price,
                    description,
                    image,
                    categoryId,
                    cloudinaryId
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
}

const getProduct = async(req,res) =>{
    try{
        const id = await req.params.id
        const product = await prisma.product.findUnique({
            where:{
                id:Number(id)
            },
            include:{category:true}
        })

        if(product){
            res.status(200).json(product)
        }else{
            res.status(404).json("The product id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const updateProduct = async(req,res) =>{
    try{
        const id = req.params.id
        const product = await prisma.product.update({
            data:req.body,
            where:{
                id:Number(id)
            },
        })
        if(product){
            unlink(req.file.path,(err)=>{
                if(err) return res.status(500).json('failed to delete file');
            });

            res.status(200).json({message:"Product has been updated."})
        }else{
            res.status(404).json("The product id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const deleteProduct = async(req,res) =>{
    try{
        const id = req.params.id
        const product = await prisma.product.delete({
            where:{
                id:Number(id)
            },
        })
        if(product){
            unlink(req.file.path,(err)=>{
                if(err) return res.status(500).json('failed to delete file');
            });

            res.status(200).json({message:"Product has been deleted."})
        }else{
            res.status(404).json("The product id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

module.exports = {
    getProducts,
    addProduct,
    getProduct,
    updateProduct,
    deleteProduct
}
