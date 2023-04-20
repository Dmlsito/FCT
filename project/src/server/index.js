
const express = require('express')

const app = express()
const usersRoutes = require('./routes/users.routes.js')
const homeRoutes = require('./routes/home.routes.js')
// Webpack config
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('../../webpack.config.js')
app.use(webpackDevMiddleware(webpack(webpackConfig)))
app.use(express.static(__dirname + './build/index.html'))

// De estas formas ya tenemos las rutas //
app.use(usersRoutes)
app.use(homeRoutes)
app.listen(8080, () => {
  console.log(`server on port ${8080}`)
})
