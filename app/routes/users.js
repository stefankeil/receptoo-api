var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.route('/users')
  // create
  .post(function (req, res) {
    var user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password

    // save the user and check for errors
    user.save(function (err) {
      if (err) res.send(err)

      res.json({ message: 'User created!' })
    })
  })

  // get all users
  .get(function (req, res) {
    User.find(function (err, users) {
      if (err) res.send(err)

      res.json(users)
    })
  })

router.route('/users/:user_id')
  // get a user by id
  .get(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) res.send(err)

      res.json(user)
    })
  })

  // update
  .put(function (req, res) {
    User.findById(req.params.user_id, function (err, user) {
      if (err) res.send(err)

      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password

      user.save(function (err) {
        if (err) res.send(err)

        res.json({ message: 'User updated!' })
      })

    })
  })

  // delete
  .delete(function (req, res) {
    User.remove({
      _id: req.params.user_id
    }, function (err, user) {
      if (err) res.send(err)

      res.json({ message: 'Successfully deleted' })
    })
  })

module.exports = router
