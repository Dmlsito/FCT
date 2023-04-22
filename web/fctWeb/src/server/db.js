const createPool = require('mysql2/promise')
// Aqui definimos los parametros para poder conectarnos a nuestra BBDD
const pool = createPool.createPool({
  host: 'db4free.net',
  user: 'dmlsito14',
  password: 'Instiagra14',
  port: 3306,
  database: 'fctprueba'
})

module.exports = pool
