const mqtt = require('mqtt')
const Serialport = require('serialport')
// Definimos un nuevo puerto, tendremos que indicar el puerto en el que estamos conectado
const port = new Serialport('COM1', {
  // Tasa de envio de datos //
  baudRate: 9600
})
// Parseador que transformara lo que llegue por el serial a una cadena de Strings
const parser = port.pipe(new Serialport.parsers.ReadLine({ delimiter: '\n' }))

// Aqui le pasaremos la URL del broker //
const pub = mqtt.connect('mqtt://localhost:9000')
// Aqui tendremos que mandar los datos que leemos desde el arduino para ello //
// tendremos que instalar una dependia para poder leer esos datos //
// Mandamos los datos desde el pub hasta el broker
pub.on('connect', () => {
  // Evento que se desencadena cuando al parser le llegan datos //
  // de esta manera cuando tengamos la info la podremos parsear a un string //
  parser.on('data', (data) => {
    pub.publish('topic test', data)
  })
})
