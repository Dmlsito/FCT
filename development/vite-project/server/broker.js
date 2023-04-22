import mosca from 'mosca'

// Broker -> servidor //
const broker = new mosca.Server({
    port: 9000
  })
  broker.on('ready', () => {
    console.log('Mosca broker is ready!')
  })
  broker.on('clientConnected', (client) => {
    console.log('Cliente connected: ', client.id)
  })
  