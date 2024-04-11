const express = require('express')

const app = express()
app.use(express.json())

// GET
// app.get('/users', (request, response) => {
//   const { page, limit } = request.query
//   response.send(`Page ${page}, limit ${limit}`)
// })

app.post('/users', (request, response) => {
  const { name, email, password } = request.body
  response.json({ name, email, password })
})

const PORT = 3333
app.listen(PORT, () => console.log(`⚡ Server ir running in port ${PORT}`))