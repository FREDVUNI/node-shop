const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan("tiny"))

// app.use("/",(req,res)=>{
//     res.status(200)
//     .json({
//         message:"API for the e-commerce store. Check out it's documentation below 🐻",
//         api_documentation: "https://documenter.getpostman.com/view/21884902/UzJQqEYA"
//     })
// })

app.use("/api/v1/products",require("./routes/ProductRoutes"))
app.use("/api/v1/categories",require("./routes/CategoryRoutes"))
app.use("/api/v1/users",require("./routes/UserRoutes"))
// app.use("/api/v1/cart",require("./routes/CartRoutes"))

module.exports = app