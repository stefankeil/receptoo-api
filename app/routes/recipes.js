var Recipe = require('../models/recipe')

var recipes = {
  getAll: function (req, res) {
    Recipe.find(function (err, recipes) {
      if (err) res.send(err)

      res.json(recipes)
    })
  },

  getOne: function (req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
      if (err) res.send(err)

      res.json(recipe)
    })
  },

  create: function (req, res) {
    var recipe = new Recipe()
    recipe.title = req.body.title

    // save the recipe and check for errors
    recipe.save(function (err) {
      if (err) res.send(err)

      res.json({ message: 'Recipe created!' })
    })
  },

  update: function (req, res) {
    Recipe.findById(req.params.id, function (err, recipe) {
      if (err) res.send(err)

      recipe.title = req.body.title

      recipe.save(function (err) {
        if (err) res.send(err)

        res.json({ message: 'Recipe updated!' })
      })

    })
  },

  delete: function (req, res) {
    Recipe.remove({
      _id: req.params.id
    }, function (err, recipe) {
      if (err) res.send(err)

      res.json({ message: 'Successfully deleted' })
    })
  }
}

module.exports = recipes
