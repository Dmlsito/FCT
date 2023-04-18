// Se subscribe a la informacion del publisher //
const mqtt = require('mqtt')
const mysql = require('mysql')
const DB = mysql.createConnection({
  host: 'db4free.net',
  port: 3306,
  user: 'dmlsito14',
  password: 'Instiagra14',
  database: 'fctprueba'
})
// dmlsito14, Instiagra14
// Evento que se dencadenara cuando se conecte a la DDBB
DB.connect(() => {
  console.log('Database okey')
})

const sub = mqtt.connect('mqtt://localhost:9000')
// Se subscribe al broker
sub.on('connect', () => {
  // Se subscribe a lo que publica el publisher
  sub.subscribe('topic test')
})

sub.on('message', (topic, message) => {
  const pressureNumber = parseInt(message)

  // const date = new Date() //
  if (pressureNumber >= 70) {
    DB.query(`UPDATE machine_state SET state = ${1} WHERE id = 18`)
  } else {
    DB.query(`UPDATE machine_state SET state = ${0} WHERE id = 18`)
  }
})
// 19: 31
