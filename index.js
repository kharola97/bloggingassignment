const express = require("express")
require("dotenv").config();
const app = express()

const mongoose = require("mongoose")


const route = require("./route")
const url = process.env.DATABASE_CONNECTION
const PORT = process.env.PORT

app.use(express.json())

mongoose.connect(url,)
.then(()=>console.log("MongoDB is connected"))
.catch((err)=> console.log(err))

app.use("/", route)
app.listen(PORT,function(){
    console.log("port is running on 3000")
})