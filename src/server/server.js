const express = require('express')
const router = require('./routes.js')
const cors = require('cors')

const server = express()

server.use(express.json())
server.use(cors())
server.use(router)

module.exports = server