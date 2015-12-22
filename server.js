var express = require('express')
var app = express()
var config = require('./config')

var bodyParser = require('body-parser')
var mongoose = require('mongoose')

// coniguartion stuff
mongoose.connect(config.database)

var port = process.env.PORT || 8080
// app.set('superSecret', config.secret)

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*') // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
app.all('/api/*', [require('./app/middlewares/validateRequest')])

app.use('/', require('./app/routes'))

// If no route is matched by now, it must be a 404
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.listen(port)
console.log('Starting Server on Port ' + port)
