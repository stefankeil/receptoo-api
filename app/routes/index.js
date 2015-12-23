var express = require('express')
var router = express.Router()

var auth = require('./auth.js')
var user = require('./users.js')
var recipes = require('./recipes.js')

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login)
router.get('/checkLogin', auth.checkLogin)

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/recipes', recipes.getAll)
router.get('/api/recipe/:id', recipes.getOne)
router.post('/api/recipe/', recipes.create)
router.put('/api/recipe/:id', recipes.update)
router.delete('/api/recipe/:id', recipes.delete)

/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/admin/users', user.getAll)
router.get('/api/admin/user/:id', user.getOne)
router.post('/api/admin/user/', user.create)
router.put('/api/admin/user/:id', user.update)
router.delete('/api/admin/user/:id', user.delete)

module.exports = router
