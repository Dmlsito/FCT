import { Login } from './Components/Login'
import { Home } from './Components/Home'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Wolfson manufacturing workshop</h1>
      </div>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/main-page' element={<Home />} />
      </Routes>
    </div>
  )
}
export default App
