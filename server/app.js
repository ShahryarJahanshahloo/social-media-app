const express = require("express")
const cors = require("cors")
const path = require('path');

require("./src/db/mongoose")
const userRouter = require("./src/routes/user")
const tweetRouter = require("./src/routes/tweet")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))
app.use("/api", userRouter)
app.use("/api", tweetRouter)

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

module.exports = app