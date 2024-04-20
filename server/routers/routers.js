const express = require("express")
const routers = express.Router()
const {getData} = require("../functions/getdata")
const { sendMessage , sendMessageToError} = require("../functions/sendData")
const { check } = require("../healthcheck/react")
const { checkserver } = require("../healthcheck/express")


routers.get("/get" , getData)
routers.post("/send" , sendMessage)
routers.post("/error" , sendMessageToError)
routers.get("/healthclient" , check)
routers.get("/healthserver" , checkserver)


module.exports = routers