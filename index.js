const express = require("express")
const app = express()
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config({path:".env"})
const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan("tiny"))

app.use("/api/v1/products",require("./routes/ProductRoutes"))
app.use("/api/v1/categories",require("./routes/CategoryRoutes"))
app.use("/api/v1/users",require("./routes/UserRoutes"))
// app.use("/api/v1/cart",require("./routes/CartRoutes"))

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})