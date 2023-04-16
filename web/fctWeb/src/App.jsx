
import { useState, useEffect} from 'react'
import { Login} from './components/Login'
import { Home } from './components/Home'
import{ Link, Route, Routes } from 'react-router-dom'
const App = () => {
    return (
        <div className='App'>
        <div className='App-head'>
            <ul className='App-head-list'>
                <li>sdf</li>
                <li>sdf</li>
                <li>sfds</li>
            </ul>
        </div>
        <Routes>
         <Route path='/' element={<Login />}/>
         <Route path='/main-page' element={<Home />}/>
        </Routes>
        </div>
    )
}
export default App