// Publisher -> manda la informacion
const mqtt = require('mqtt')
const SerialPort = require('serialport')

const port = new SerialPort('COM5', {
  baudRate: 9600
})
// Parser //
const parser = port.pipe(new SerialPort.parsers.Readline({ delimiter: '\n' }))
const pub = mqtt.connect('mqtt://localhost:9000')

pub.on('connect', () => {
  // Cuando al parseador le llegan datos se desencadena el evento //
  parser.on('data', (data) => {
    pub.publish('topic test', data)
  })
})
