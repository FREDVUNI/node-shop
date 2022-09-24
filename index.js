const app = require("./app")
const dotenv = require("dotenv")

dotenv.config({path:".env"})

const PORT = process.env.PORT || 8080

app.listen(PORT,()=>{
    console.log(`server started on http://localhost:${PORT}`)
})