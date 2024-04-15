const { Router } = require('express')

const UsersController = require('../controllers/UsersController')

const usersRoutes = Router()


// function myMiddleware(request, response, next) {
//   const { isAdmin } = request.body
  
//   if (!isAdmin) {
//     return response.status(401).json({ error: 'Unauthorized' })
//   }

//   console.log(request.body)
//   return next()
// }


const usersController = new UsersController()

usersRoutes.post('/', usersController.create)

module.exports = usersRoutes