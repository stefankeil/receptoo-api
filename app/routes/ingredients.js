var express = require('express')
var router = express.Router()
var Ingredient = require('../models/ingredient')

// TODO change to new rest routes
router.route('/ingredients')
  // get all
  .get(function (req, res) {
    Ingredient.find(function (err, ingredients) {
      if (err) res.send(err)

      res.json(ingredients)
    })
  })

module.exports = router
