
import { Login } from './Login'
import { Home } from './Home'
import { Route, Routes } from 'react-router-dom'
import { Entry } from './Entry'
import { Clock } from './Clock'
const App = () => {
  return (
    <div className='App'>
      <div className='App-head'>
        <span className='App-head-clock'><Clock /></span>
        <h1 className='App-head-title'>Wolfson manufacturing workshop</h1>
        <ul className='App-head-list'>
          <li>wolfsonManufacturing@gmail.com</li>
          <li>698-444-333</li>
        </ul>
      </div>
      <Routes>
        <Route path='/' element={<Entry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/main-page' element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
