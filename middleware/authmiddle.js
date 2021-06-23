const jwt = require('jsonwebtoken')


module.exports=function(req, res, next){
  // read token from header 
  const token = req.header('x-auth-token')

  // check if was send the token
  if(!token){
    return res.status(401).json({msg: "unauthorized"})
  }

  try {
    
    const cifrated = jwt.verify(token, process.env.SECRET)
    req.user = cifrated.user
    next()

  } catch (error) {
    res.status(401).json({msg: "invalid token"})
    console.log(error)
  }
}