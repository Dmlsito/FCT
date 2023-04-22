
import express from 'express'
import pool from './db.js'



const app = express()

// Desactivamos los cors con esto //
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(express.json())

app.listen(8080, () => {
  console.log(`server on port ${8080}`)
})

app.get('/login', async (request, response) => {
  const [rows] = await pool.query('SELECT * FROM Users').then()
  response.json(rows)
})

app.get('/main-page' , async (request, response) => {
  console.log('Estan accediendo a los datos de las maquinas')
  const [rows] = await  pool.query('SELECT * FROM machine_state').then()
  if(rows.length <= 0){
    console.log('No se han podido mandar los datos')
    response.status(404).end()
  }
  else {
    response.json(rows)
  }
})
