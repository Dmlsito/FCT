import { Clock } from './Clock'
import { FaPhoneAlt } from 'react-icons/fa'
import { HiChatBubbleBottomCenter } from 'react-icons/hi2'

export const Header = () => {
  return (
    <div className='App-head'>
      <span className='App-head-clock'><Clock /></span>
      <h1 className='App-head-title'>Wolfson manufacturing workshop</h1>
      <ul className='App-head-list'>
        <li><HiChatBubbleBottomCenter className='App-head-list-i' />wolfsonManufacturing@gmail.com</li>
        <li><FaPhoneAlt className='App-head-list-i' />698-444-333</li>
      </ul>
    </div>
  )
}
