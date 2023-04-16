// Broker -> servidor //
const mosca = require('mosca')
const broker = new mosca.Server({
    port: 9000
})
broker.on('ready', () => {
    console.log('Mosca broker is ready!')
})
broker.on('clientConnected', (client) => {
    console.log('Cliente connected: ', client.id )
})
/*
broker.on('published', (packet) => {
    console.log(packet.payload.toString())
})
*/

