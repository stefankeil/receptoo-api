var jwt = require('jwt-simple')
var config = require('../../config')
var User = require('../models/user')

var auth = {
  login: function (req, res) {
    var email = req.body.email || ''
    var password = req.body.password || ''

    if (email === '' || password === '') {
      res.status(401)
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      })
      return
    }

    // Fire a query to your DB and check if the credentials are valid
    auth.validate(email, password).then((user) => {
      if (!user) { // If authentication fails, we send a 401 back
        res.status(401)
        res.json({
          'status': 401,
          'message': 'Invalid credentials'
        })
        return
      }

      if (user) {
        // If authentication is success, we will generate a token
        // and dispatch it to the client

        res.json(genToken(user))
      }
    })
  },

  checkLogin: function (req, res) {
    res.json({
      'loggedIn': true,
      'message': 'Logged in.'
    })
  },

  validate: function (email, password) {
    return User.findOne({ email: email }, function (err, user) {
      if (err) return handleError(err)
      if (user.password === password) return user
    }).lean()
  },

  validateUser: function (email) {
    return User.findOne({ email: email }, function (err, user) {
      if (err) return handleError(err)
      return user
    }).lean()
  }
}

// private method
function genToken (user) {
  var expires = expiresIn(1) // 7 days
  var token = jwt.encode({
    exp: expires,
    email: user.email
  }, config.secret)

  return {
    token: token,
    expires: expires,
    user: user
  }
}

function expiresIn (numDays) {
  var dateObj = new Date()
  return dateObj.setDate(dateObj.getDate() + numDays)
}

module.exports = auth
