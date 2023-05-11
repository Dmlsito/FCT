/* eslint-disable no-useless-return */
import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
import { FaRegCommentDots } from 'react-icons/fa'
import { Chat } from './Chat'
import { HiOutlineReply } from 'react-icons/hi'
import { io } from 'socket.io-client'

// Conectamos el front con el back, como hicimos con el back //
const SOCKET = io.connect('http://localhost:8080')

export const Home = () => {
  const [indexStart, setIndexStart] = useState(0)
  const [chatUsername, setChatUsername] = useState('')
  const [room, setRoom] = useState('')
  const [chatLoginAppeared, setChatLoginAppeared] = useState(false)
  const [chatAppeared, setChatAppeared] = useState(false)
  const [click, setClick] = useState(false)
  const [clearMessages, setClearMessages] = useState(true)
  const classNameChat = chatAppeared ? 'home-chat' : 'home-chat invisible'

  const handleClick = () => {
    setClick(!click)
    if (indexStart === 12) { setIndexStart(0) } else {
      setIndexStart(indexStart + 6)
    }
  }

  const chat = () => {
    if (chatAppeared) return
    setChatLoginAppeared(!chatLoginAppeared)
  }
  console.log(room)
  const handleClickChat = e => {
    setChatLoginAppeared(!chatLoginAppeared)
    setChatAppeared(!chatAppeared)
    if (chatUsername !== null && room !== null) {
      SOCKET.emit('join_room', room)
    }
  }
  const goOutChat = () => {
    setClearMessages(!clearMessages)
    setChatAppeared(false)
    setChatLoginAppeared(true)
  }
  const handleChangeRoom = e => setRoom(e.target.value)
  const handleChangeUser = e => setChatUsername(e.target.value)
  return (
    <main className='home'>
      <div className='home-main'>
        <div className='home-picture'>
          <img src='../images/pngDani.png' className='home-picture-image' />
        </div>
        <article className='home-article'>
          <TableState indexStart={indexStart} handleClick={handleClick} click={click} />
        </article>
        {chatLoginAppeared &&
          <aside className='home-chatLogin'>
            <input placeholder='username' name='chatUsername' value={chatUsername} onChange={handleChangeUser} />
            <input placeholder='room id' name='chatRoomName' value={room} onChange={handleChangeRoom} />
            <button onClick={handleClickChat}>Create room</button>
          </aside>}
        <aside className={classNameChat}>
          <button onClick={goOutChat} className='home-chat-button'><HiOutlineReply /></button>
          <Chat socket={SOCKET} username={chatUsername} room={room} clear={clearMessages} />
        </aside>
      </div>
      <div className='home-aside'>
        <button onClick={chat}><FaRegCommentDots className='home-aside-icon' /></button>
      </div>
    </main>
  )
}
