// Se subscribe a la informacion del publisher //
const mqtt = require('mqtt')

const sub = mqtt.connect('mqtt://localhost:9000')
// Se subscribe al broker
sub.on('connect', () => {
    sub.subscribe('topic test')
})

sub.on('message', (topic, message) => {
    console.log(message.toString())
})
//19: 31