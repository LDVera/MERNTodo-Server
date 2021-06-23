// routes to create the users
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController') 
const { check } = require('express-validator')

// crea a un usuario
//  api/users
router.post('/', 
  [
    check('name', 'the name is required').not().isEmpty(),
    check('email', 'add a valid email').isEmail(),
    check('password', 'the pass should have as min 6 characters').isLength({min: 6})
  ],
  userController.createUser
)
module.exports = router
