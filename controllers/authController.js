const User = require('../models/Users')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {

  const errors = validationResult(req)

  if ( !errors.isEmpty() ){
    return res.status(400).json({errors: errors.array()})
  }

  // extract email and pass to validate the user
  const { email, password } = req.body
  try {
    
    // check that the user is register
    let user = await User.findOne({ email })
    if(!user){
      return res.status(400).json({msg: "the user is not register yet"})
    }

    const correctPass = await bcryptjs.compare(password, user.password)
    
    if(!correctPass){
      return res.status(400).json({msg: "incorrect pass"})
    }

    // create and sign the jwt
    const payload = {
      user: {
        id: user.id,
      }
    }

    // sign the jwt
    jwt.sin
    jwt.sign(payload, process.env.SECRET,
      {expiresIn: 3600}, 
      (error, token) => {
        if(error) throw error

        res.json({token: token})
      }
    )
  } catch (error) {
    console.log(error)
  }

}

exports.authenticatedUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json({user})
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "have an error"})
  }
}