require('dotenv').config()

const express = require('express')
const app = express()

const apiRoutes = require('./routes/api')
 
app.get('/', function(req, res) {
  res.type('text')
    .send(process.env.ADMIN_PROJECT || 'v4ex-api-admin')
})

apiRoutes(app)

module.exports = app
