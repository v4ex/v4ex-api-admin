//

const { response } = require('express')
const { OAuth2Client } = require('google-auth-library')


const clientId = process.env.ADMIN_GOOGLE_CLIENT_ID
const clientSecret = process.env.ADMIN_GOOGLE_CLIENT_SECRET 
let redirectUri = ''



const apiRoutes = app => {

  app.route('/api/v1/offline-login')
    .get(function(req, res) {
      redirectUri = req.protocol + '://' + req.get('host') + '/api/v1/login/callback'
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        redirectUri 
      )
      const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      })
      
      res.type('text')
        .send(authorizeUrl)
        .end()

    })

  app.route('/api/v1/login')
    .get(function(req, res) {

    })

  app.route('/api/v1/login/callback')
    .get(function(req, res) {
      const code = req.query.code
      redirectUri = req.protocol + '://' + req.get('host') + '/api/v1/login/callback'
      const oAuth2Client = new OAuth2Client(
        clientId,
        clientSecret,
        redirectUri 
      )
      oAuth2Client.getToken(code, (err, tokens, response) => {
        console.log(`tokens`, tokens)
        console.log(`response`, response)
        res.status(200).end()
      })
    })

}

module.exports = apiRoutes
