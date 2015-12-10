var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

// define the model properties
var UserSchema   = new Schema({
	name:     String,
	email:    String,
	password: String
})

module.exports = mongoose.model('User', UserSchema)
