const express = require('express')

const app = express()

app.get('/message/:id/:user', (request, response) => {
  const { id, user} = request.params
  response.send(`Id message ${id}, user ${user}`)
})

app.get('/user', (request, response) => {
  const { page, limit } = request.query
  response.send(`Page ${page}, limit ${limit}`)
})

const PORT = 3333
app.listen(PORT, () => console.log(`⚡ Server ir running in port ${PORT}`))