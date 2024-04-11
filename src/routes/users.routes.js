const { Router } = require('express')

const usersRoutes = Router()

// GET
// app.get('/users', (request, response) => {
//   const { page, limit } = request.query
//   response.send(`Page ${page}, limit ${limit}`)
// })

usersRoutes.post('/', (request, response) => {
  const { name, email, password } = request.body
  response.json({ name, email, password })
})


module.exports = usersRoutes