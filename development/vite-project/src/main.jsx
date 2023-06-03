// eslint-disable-next-line no-unused-vars
import { React } from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './css/App.css'
import './css/index.css'
import { BrowserRouter } from 'react-router-dom'
import { UsersProvider } from './context/user.jsx'
// Punto de inicio de la aplicacio, AQUI SE CARGA EL COMPONENTE APP//
ReactDOM.createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <UsersProvider>
      <App />
    </UsersProvider>
  </BrowserRouter>

)
