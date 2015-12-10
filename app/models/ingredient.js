var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

// define the model properties
var IngredientSchema     = new Schema({
    name:            String,
    ingredient_type: {type: String, enum: ['meat', 'vegetable', 'fruit', 'fish']}
})

module.exports = mongoose.model('Ingridient', IngredientSchema)
