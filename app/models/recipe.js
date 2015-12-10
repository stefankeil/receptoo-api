var mongoose     = require('mongoose')
var Schema       = mongoose.Schema

// define the model properties
var RecipeSchema   = new Schema({
    title:          String,
    description:    String,
    category:       {type: String, enum: ['mediterrean', 'beverage', 'halal', 'salad']},
    creator:        {type: Schema.Types.ObjectId, ref: 'User'},
    duration:       Number,
    rating:         { type: Number, min: 1, max: 5 },
    difficulty:     { type: Number, min: 1, max: 5 },
    ingredients:    [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
    comments:       [{ body: String, date: Date }]
})

module.exports = mongoose.model('Recipe', RecipeSchema)
