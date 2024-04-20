const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const cors = require("cors")
const connection = require("./database/connectDB")
const routers = require("./routers/routers")
const {consumeFromQueue , consumeFromErrorQueue} = require("./rabbitmq/queue")
dotenv.config()


consumeFromQueue()
consumeFromErrorQueue()
connection()
app.use(bodyParser.json())
app.use(cors())

app.use("/" , routers)



app.listen(5000 , ()=>{
    console.log("server listening")
})