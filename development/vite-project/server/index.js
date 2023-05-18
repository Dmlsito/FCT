
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
let usernamePrincipal
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
    usernamePrincipal = username
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
  // console.log(usernamePassword, usernamePrincipal) //
  const [rows] = await pool.query('SELECT * FROM machine_state').then()
  const [rows2] = await pool.query('SELECT * FROM Users_roles INNER JOIN Users ON Users_roles.Id_Usuario = Users.Id')
  console.log(rows2)
  let roles
  rows2.forEach(role => {
    if (role.Username === usernamePrincipal) roles = role.Role
  })
  console.log(roles)
  console.log({ rows, roles })
  if (rows.length <= 0) {
    console.log('No se han podido mandar los datos')
    response.status(404).end()
  } else {
    response.json({ rows, roles }).status(200)
  }
})
app.get('/main-page', (request, response) => {

})
app.post('/main-page', async (request, response) => {
  // const chatUsername = request.body.chatUsername //
  const roomId = request.body.chatRoomName
  const res = await pool.query('INSERT INTO Chat (Room_id) VALUES (?)', [roomId])
  const [res2] = await pool.query('SELECT * FROM Users WHERE Username = ?', [usernamePrincipal])
  console.log(res2)
  let id
  res2.forEach(user => {
    id = user.Id
  })
  console.log(id)

  pool.query('INSERT INTO Users_chat (Id_Usuario, Id_room) VALUES (?, ?)', [id, roomId])
  response.json(res).status(200)
})

// Datos para el chat //
// Project ID -> ea5ad5a0-17a7-491d-a0e9-5af3c163e437 //
// Private Key -> 91194d0c-e20d-4173-9ee9-4a994a058e60 //
