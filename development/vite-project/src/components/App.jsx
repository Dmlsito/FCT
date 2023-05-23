
import { Login } from './Login'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Entry } from './Entry'

import { Header } from './Header'
// TODO LO QUE ESTE FUERA DE <Routes> va a estar siempre en cualquier salto de pestana //
const App = () => {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main-page' element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
