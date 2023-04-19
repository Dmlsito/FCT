/*
import { createServer } from 'http'
import { createReadStream } from 'fs'
const server = createServer((req, res) => {
  const read = createReadStream('./index.html')
  read.pipe(res)
})

server.listen(3000)
console.log(`Server on port ${3000}`)
*/

import express from 'express'

const app = express()

app.get('/', (request, response) => {
  response.sendFile('./src/app/index.html', {
    root: __dirname
  })
})
app.listen(9995)
console.log(`Server on port ${9995}`)
