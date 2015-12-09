var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

// define the model properties
var UserSchema   = new Schema({
})

module.exports = mongoose.model('User', UserSchema)
