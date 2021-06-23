// routes to auth the users
const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const authmiddle = require('../middleware/authmiddle')
const authController = require('../controllers/authController')

// login
//  api/auth
router.post('/', 
  authController.authUser
)

router.get('/', 
  authmiddle,
  authController.authenticatedUser
)
module.exports = router
