
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// Webpack config

const pool = require('./db.js')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(8080, () => {
  console.log(`server on port ${8080}`)
})

app.post('/login', async (request, response) => {
  const username = request.body.name
  const password = request.body.password
  console.log(username)
  console.log(password)
  const [rows] = await pool.query('SELECT * FROM Users WHERE Password = ?', [password]).then()
  if (rows.length <= 0) {
    console.log('No existe este usuario')
    response.json({ error: 'El usuairo no existe' })
    // response.status(404).send({ error: 'usuario incorrecto' })
  } else {
    console.log('Este usuairo esta registrado en la BBDD')
    response.json({})
    // response.status(200).send({})
  }
})

app.get('/login', (request, response) => {
  response.json({ hola: 'hola a todos' })
})
