
import express from 'express'
import pool from './db.js'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
})

// Desactivamos los cors con esto //
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})

app.use(express.json())

server.listen(8080, () => {
  console.log(`server on port ${8080}`)
})

// Socket.io //
io.on('connection', (socket) => {
  console.log('usuario conectado al socket', socket.id)

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User with the ID ${socket.id} joined room: ${data}`)
  })

  socket.on('send_message', (data) => {
    // Cuando se envie un mensaje el socket va a enviar el mensaje de vuelta, pero le tenemos que
    // especificar el id de la sala
    console.log(data.room)
    socket.to(data.room).emit('receive_message', data)
  })
  socket.on('disconnected', (data) => {
    console.log('User disconnected', socket.id)
    socket.leave(data)
  })
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

// Datos para el chat //
// Project ID -> ea5ad5a0-17a7-491d-a0e9-5af3c163e437 //
// Private Key -> 91194d0c-e20d-4173-9ee9-4a994a058e60 //
