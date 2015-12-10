var express = require('express')
var router  = express.Router()
var Recipe  = require('../models/recipe')

router.route('/recipes')
  // get all
  .get(function (req, res) {
    Recipe.find(function (err, recipes) {
      if (err) res.send(err)

      res.json(recipes)
    })
  })

module.exports = router
