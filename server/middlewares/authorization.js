const { UnauthenticatedError } = require('../errors')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const authorization = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('No token provided')
  }
  const token = authHeader.split(' ')[1]
  try {
    const { userId, userName } = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = userId
    req.userName = userName
    next()
  } catch (error) {
    throw new UnauthenticatedError('provided token is not valid')
  }
}

module.exports = authorization
