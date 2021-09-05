require('dotenv').config()

const app = require('./app')
 
const port = process.env.ADMIN_PORT || 4002
const server = app.listen(port, function() {
  console.log('App listening on port %s, in environment %s!', port, (process.env.ADMIN_ENV || ''))
})
