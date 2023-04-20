// Punto de entrada de nuestra aplicacion
// Webpack por defecto tiene establecido que el punto de entrada de la apliaacion sea el archivo
// index.js que este en la carpeta src
import ReactDOM from 'react-dom'
import App from './App'
import './Components/css/App.css'
import './Components/css/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

