// Modulo de mosca //
const mosca = require('mosca')
// Constante para el server //
const broker = new mosca.Server({
  port: 9000
})
// Cuando se desencadena el evento ready -> el servidor ya esta listo
broker.on('ready', () => {
  console.log('Mosca broker is ready!')
})
// Evento que se lanza cuando se conecta un cliente
broker.on('clientConnected', (client) => {
  console.log('New client: ', client.id)
})
broker.on('published', (packet) => {
  console.log(packet.payload.toString())
})
