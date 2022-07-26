const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient()

const getCategories = async(req,res) =>{
    try{
        
        const categories = await prisma.category.findMany({
            include:{products:true},
        })
        res.status(200).json(categories)
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const addCategory = async(req,res) =>{
    try{ 
        const {category} = req.body
        const categories = await prisma.category.findMany({})
        const filter = categories.some(item => item.category == req.body.category)

        if(!filter){
            await prisma.category.create({
                data: {category}
            })
            res.status(200).json({message:"Category has been created."})
        }else{
            res.status(400).json(`This category already exists.`)
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const getCategory = async(req,res) =>{
    try{
        const id = await req.params.id
        const category = await prisma.category.findUnique({
            where:{
                id:Number(id)
            },
            include:{products:true}
        })

        if(category){
            res.status(200).json({data:category})
        }else{
            res.status(404).json("The category id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const updateCategory = async(req,res) =>{
    try{
        const id = req.params.id
        const category = await prisma.category.update({
            data:req.body,
            where:{
                id:Number(id)
            },
        })
        if(category){
            res.status(200).json({message:"category has been updated."})
        }else{
            res.status(404).json("The category id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

const deleteCategory = async(req,res) =>{
    try{
        const id = req.params.id
        const category = await prisma.category.delete({
            where:{
                id:Number(id)
            },
        })
        if(category){
            res.status(200).json({message:"category has been deleted."})
        }else{
            res.status(404).json("The category id does not exist.")
        }
    }
    catch(error){
        res.status(500).json(error.message || "There was a server error.")
    }
}

module.exports = {
    getCategories,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory
}