
const express = require('express')
const pool = require('./db.js').default
const app = express()

// Webpack config
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../../webpack.config.js')

app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(express.static(__dirname + './build/index.html'))

app.get('/main-page', (request, response) => {
  response.send('Estoy en el login')
})
app.post('/', (request, response) => {
  response.send('Estoy creando algo')
})
app.put('/', (request, response) => {
  response.send('Estoy actualizando algo')
})

app.delete('/', (request, response) => {
  response.send('Estoy eliminando algo')
})

app.listen(8080, () => {
  console.log(`server on port ${8080}`)
})

app.get('/main-page', async (request, response) => {
  const result = await pool.query('SELECT 1 + 1 AS result')
  response.json(result)
})
