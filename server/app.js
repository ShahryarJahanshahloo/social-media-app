const express = require('express')
const cors = require('cors')
const path = require('path')

require('./src/db/mongoose')
const userRouter = require('./src/routes/user')
const tweetRouter = require('./src/routes/tweet')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')))
// app.use(express.static(__dirname + '/public'))
// app.use('/uploads', express.static(__dirname + '/public'))
app.use('/api', userRouter)
app.use('/api', tweetRouter)
app.use('/api', (req, res, next) => {
  res.status(404).send({ error: 'api 404!!!' })
})
app.use((req, res, next) => {
  if (req.xhr || req.headers.accept.indexOf('json') > -1) {
    next()
  } else {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  }
})

module.exports = app
