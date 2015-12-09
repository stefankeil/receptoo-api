var express    = require('express')
var app        = express()
var config     = require('./config')

var bodyParser = require('body-parser')
var mongoose   = require('mongoose')

var users      = require('./app/routes/users')

// coniguartion stuff
mongoose.connect(config.database)

var port = process.env.PORT || 8080
var router = express.Router()

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// middleware to use for all requests e.g for authentication aso
router.use(function (req, res, next) {
  // do logging
  console.log('Ahh a request.')
  next()
})

// register routes
app.use('/api', router)
app.use('/api', users)

app.listen(port)
console.log('Starting Server on Port ' + port)
