const { verify } =  require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization

  if(!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  try {
    const [, token] = authHeader.split(' ')

    const { sub: user_id } = verify(token, authConfig.jwt)
    request.user = { 
      id: Number(user_id)
    }

    return next()
  } catch {
    throw new AppError('Invalid JWT token', 401)
  }

}