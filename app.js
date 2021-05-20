const express = require("express")
require("./src/db/mongoose")
const userRouter = require("./src/routes/user")
const tweetRouter = require("./src/routes/tweet")

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(userRouter)
app.use(tweetRouter)

app.listen(port, () => {
    console.log("server is up on port " + port)
})