import mqtt from 'mqtt'
import pool from './db.js'

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
    pool.query(`UPDATE machine_state SET state = ${1} WHERE id = 18`)
  } else {
    pool.query(`UPDATE machine_state SET state = ${0} WHERE id = 18`)
  }
})