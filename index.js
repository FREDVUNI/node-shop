const express = require("express")
const app = express()
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config({path:".env"})
const PORT = process.env.PORT || 8080

app.use(morgan("tiny"))

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})