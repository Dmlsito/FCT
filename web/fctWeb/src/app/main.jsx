import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/css/App.css'
import './components/css/index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
