import { Clock } from './Clock'
import { useState } from 'react'
import { FaPhoneAlt, FaSun, FaMoon } from 'react-icons/fa'
import { HiChatBubbleBottomCenter } from 'react-icons/hi2'
import '../css/Header.css'

export const Header = () => {
  const [darkMode, setDarkMode] = useState(false)
  const className = darkMode ? 'switch darkMode' : 'switch'
  const handleClick = () => {
    setDarkMode(!darkMode)
  }
  return (
    <div className='App-head'>
      <span className='App-head-clock'><Clock /></span>
      <h1 className='App-head-title'>Wolfson manufacturing workshop</h1>
      <ul className='App-head-list'>
        <li><HiChatBubbleBottomCenter className='App-head-list-i' />wolfsonManufacturing@gmail.com</li>
        <li><FaPhoneAlt className='App-head-list-i' />698-444-333</li>
        <button className={className} onClick={handleClick}>
          <span><FaSun className='iconMode' /></span>
          <span><FaMoon className='iconMode' /></span>
        </button>
      </ul>
    </div>
  )
}
