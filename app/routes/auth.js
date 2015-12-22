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
    var dbUserObj = auth.validate(email, password)

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401)
      res.json({
        'status': 401,
        'message': 'Invalid credentials'
      })
      return
    }

    if (dbUserObj) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj))
    }

  },

  validate: function (email, password) {
    User.findOne({ email: email }, {lean: true}, function (err, user) {
      if (err) return handleError(err)
      if (user.password === password) return user
    }).exec()
  },

  // TODO fix 
  validateUser: function (email) {
    // var usr = User.findOne({ email: email })
    //   .lean(true)
    //   .exec(function (err, user) {
    //     if (err) return handleErr(err)
    //     return user
    //   })
    var usr = {
      email: 'stefan@ex.com',
      password: 'supersecure',
      role: 'admin'
    }
    return usr
  },
}

// private method
function genToken (user) {
  var expires = expiresIn(1) // 7 days
  var token = jwt.encode({
    exp: expires
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
