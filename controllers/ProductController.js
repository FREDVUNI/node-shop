const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()
const {unlink} = require('fs');

const get_products = async(req,res) =>{
    try{
        const products = await prisma.product.findMany({
            include:{category:true}
        })
        res.status(200).json({message:"all products",data:products})
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const add_product = async(req,res) =>{
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
                    categoryId
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

const get_product = async(req,res) =>{
    try{
        const id = await req.params.id
        const product = await prisma.product.findUnique({
            where:{
                id:Number(id)
            },
            include:{category:true}
        })

        if(product){
            res.status(200).json({data:product})
        }else{
            res.status(404).json("The product id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const update_product = async(req,res) =>{
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

const delete_product = async(req,res) =>{
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
    get_products,
    add_product,
    get_product,
    update_product,
    delete_product
}
