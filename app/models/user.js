var mongoose = require('mongoose')
var Schema = mongoose.Schema

// define the model properties
var UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  created_at: { type: Date, default: Date.now },
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipe'}],
  role: String
})

module.exports = mongoose.model('User', UserSchema)
