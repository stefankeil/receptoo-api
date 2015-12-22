var User = require('../models/user')

var users = {
  getAll: function (req, res) {
    User.find(function (err, users) {
      if (err) res.send(err)

      res.json(users)
    })
  },

  getOne: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err) res.send(err)

      res.json(user)
    })
  },

  create: function (req, res) {
    var user = new User()
    user.name = req.body.name
    user.email = req.body.email
    user.password = req.body.password

    // save the user and check for errors
    user.save(function (err) {
      if (err) res.send(err)

      res.json({ message: 'User created!' })
    })
  },

  update: function (req, res) {
    User.findById(req.params.id, function (err, user) {
      if (err) res.send(err)

      user.name = req.body.name
      user.email = req.body.email
      user.password = req.body.password

      user.save(function (err) {
        if (err) res.send(err)

        res.json({ message: 'User updated!' })
      })

    })
  },

  delete: function (req, res) {
    User.remove({
      _id: req.params.id
    }, function (err, user) {
      if (err) res.send(err)

      res.json({ message: 'Successfully deleted' })
    })
  }
}

module.exports = users
