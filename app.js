const express = require("express")
require("./src/db/mongoose")
const userRouter = require("./src/routes/user")
const tweetRouter = require("./src/routes/tweet")


const app = express()
app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)

module.exports = app