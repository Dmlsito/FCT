
import { Login } from './Login'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Entry } from './Entry'

import { Header } from './Header'
const App = () => {
  return (
    <div className='App'>
      <Header className='App-headerComponent' />
      <Routes>
        <Route path='/' element={<Entry className='App-homeComponent' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main-page' element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
