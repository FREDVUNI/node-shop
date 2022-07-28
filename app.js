const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(morgan("tiny"))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get("/",(req,res)=>{
    res.status(200) 
    .json({
        status:200, 
        message:"API for the e-commerce store.Check out it's documentation below 🤷‍♂️",
        api_documentation: "https://documenter.getpostman.com/view/21884902/UzXPwGDN"
    })
})

app.use("/api/v1/products",require("./routes/ProductRoutes"))
app.use("/api/v1/categories",require("./routes/CategoryRoutes"))
app.use("/api/v1/users",require("./routes/UserRoutes"))

module.exports = app