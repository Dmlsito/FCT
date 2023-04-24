
import express from 'express'
import pool from './db.js'

const app = express()

// Desactivamos los cors con esto //
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.use(express.json())

app.listen(8080, () => {
  console.log(`server on port ${8080}`)
})

app.post('/login', async (request, response) => {
  console.log('Alguien se esta logeando')
  // Valores que ha introducido el usuario //
  const username = request.body.name
  const password = request.body.password

  const [rows] = await pool.query('SELECT * FROM Users WHERE Username = ? and Password = ? ', [username, password]).then()
  if (rows.length <= 0) {
    console.log('Este usuairo ha intentado logearse y no tiene usuario ni contrasena')
    response.json({ error: true }).status(404).end()
  } else {
    // Si existe le mandamos un json vacio
    console.log('Si que existe este usuario')
    response.json({ error: false })
  }
})

app.get('/main-page', async (request, response) => {
  console.log('Estan accediendo a los datos de las maquinas')
  const [rows] = await pool.query('SELECT * FROM machine_state').then()

  if (rows.length <= 0) {
    console.log('No se han podido mandar los datos')
    response.status(404).end()
  } else {
    response.json(rows).status(200)
  }
})
