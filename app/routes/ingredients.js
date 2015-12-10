var express = require('express')
var router  = express.Router()
var Ingredient  = require('../models/ingredient')

router.route('/ingredients')
  // get all
  .get(function (req, res) {
    Ingredient.find(function (err, ingredients) {
      if (err) res.send(err)

      res.json(ingredients)
    })
  })

module.exports = router
