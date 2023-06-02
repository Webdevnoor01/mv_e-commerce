const express = require("express")
const app = express()

const cores = require("cors")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

const router = require("./route")

app.use(cores({
    origin:["http://localhost:3000","http://192.168.107.190:3000/"],
    credentials:true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(router)




module.exports = app