/* eslint-disable no-useless-return */
import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
import { FaRegCommentDots } from 'react-icons/fa'
import { Chat } from './Chat'
import { HiOutlineReply } from 'react-icons/hi'
import { io } from 'socket.io-client'
import { useStateMachine } from '../hooks/getStateMachine'

// Conectamos el front con el back, como hicimos con el back //
const SOCKET = io.connect('http://localhost:8080')

export const Home = () => {
  const [indexStart, setIndexStart] = useState(0)
  const [chatUsername, setChatUsername] = useState('')
  const [room, setRoom] = useState()
  const [chatLoginAppeared, setChatLoginAppeared] = useState(false)
  const [chatAppeared, setChatAppeared] = useState(false)
  const [click, setClick] = useState(false)
  const [clearMessages, setClearMessages] = useState(true)
  const classNameChat = chatAppeared ? 'home-chat' : 'home-chat invisible'
  const { role } = useStateMachine({ indexStart })
  // Linea 24 - 30
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
  const handleClickChat = e => {
    if (chatUsername !== '' && room !== '' && Number.isInteger(parseInt(room))) {
      SOCKET.emit('join_room', room)
      setChatLoginAppeared(!chatLoginAppeared)
      setChatAppeared(!chatAppeared)
      const objectChatInfo = { chatUsername, chatRoomName: room }
      fetch('http://localhost:8080/main-page', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectChatInfo)
      })
    } else {
      console.log('Debes introducir un numero')
    }
  }
  const goOutChat = () => {
    setClearMessages(!clearMessages)
    setChatAppeared(false)
    setChatLoginAppeared(true)
    setChatUsername('')
    setRoom('')
  }
  const handleChangeRoom = e => setRoom(e.target.value)
  const handleChangeUser = e => setChatUsername(e.target.value)
  // LO QUE ESTA ENTRE PARANTESIS DESPUES DEL RETURN ES LO GRAFICO //
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
        <p className='home-aside-p'>{`Accessing as: ${role}`}</p>
        <div className='home-aside-button'>
          <button onClick={chat}><FaRegCommentDots className='home-aside-icon' /></button>
        </div>
      </div>
    </main>
  )
}
