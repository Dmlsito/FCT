const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const cssRules = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
}

const jsRules = {
  test: /\.js$/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-react',
        {
          runtime: 'automatic' // classic
        }
      ]

    ]
  }
}
const rules = [jsRules, cssRules]

module.exports = {
  output: {
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' })
  ],
  module: { rules },
  devServer: {
    open: true, // que se abra el navegador automaticamente
    port: 3000, // le indicamos el puerto
    compress: true
  }
}
