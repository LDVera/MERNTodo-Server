const User = require('../models/Users')
const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

// to create a new user
exports.createUser = async (req, res) => {

  const errors = validationResult(req)

  if ( !errors.isEmpty() ){
    return res.status(400).json({errors: errors.array()})
  }

  // extract email and pass 
  const {email, password} = req.body


  try {
    let user = await User.findOne({ email })

    if(user){
      return res.status(400).json({msg: "El usuario ya existe"})
    }
    
    // save the new user
    user = new User(req.body)

    // hash the pass
    const salt = await bcryptjs.genSalt(10)
    console.log(salt)
    user.password = await bcryptjs.hash(password, salt)

    // save user 
    await user.save()

    // create and sign the jwt
    const payload = {
      user: {
        id: user.id,

      }
    }

    // sign the jwt
    jwt.sign(payload, process.env.SECRET, {
      expiresIn: 3600
    }, (error, token) => {
      if(error) throw error

      res.json({token: token})
      console.log(token)
    })


    
  } catch (error) {
    console.log(error)
    res.status(400).send('have a error check it')
  }
}