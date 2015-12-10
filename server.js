var express     = require('express')
var app         = express()
var config      = require('./config')

var bodyParser  = require('body-parser')
var mongoose    = require('mongoose')
var jwt         = require('jsonwebtoken')

var users       = require('./app/routes/users')
var recipes     = require('./app/routes/recipes')
var ingredients = require('./app/routes/ingredients')
var User        = require('./app/models/user')

// coniguartion stuff
mongoose.connect(config.database)

var port = process.env.PORT || 8080
var router = express.Router()
app.set('superSecret', config.secret)

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// route to authenticate a user
router.post('/authenticate', function (req, res) {
  // find the user
  User.findOne({
    name: req.body.name
  }, function (err, user) {

    if (err) throw err

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' })
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
        })

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        })
      }   
    }

  })
})

// route middleware to verify a token
router.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token']

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' })    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    })
  }
})

// register routes
app.use('/api', router)
app.use('/api', users)
app.use('/api', recipes)
app.use('/api', ingredients)

app.listen(port)
console.log('Starting Server on Port ' + port)
