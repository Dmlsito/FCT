/* eslint-disable no-useless-return */
import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
import { FaRegCommentDots } from 'react-icons/fa'
import { Chat } from './Chat'
import { HiOutlineReply } from 'react-icons/hi'
import { io } from 'socket.io-client'
import { useStateMachine } from '../hooks/getStateMachine'
import { useUsers } from '../hooks/getUsers'
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
  const [chatAccess, setChatAccess] = useState(null)
  const [chatFree, setChatFree] = useState(null)
  const { role } = useStateMachine({ indexStart })
  const { setUser, user } = useUsers()
  console.log(user)
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
  const handleClickChatSelectRoom = async () => {
    if (chatUsername !== '' && room !== '' && Number.isInteger(parseInt(room))) {
      const { message } = await fetch(`http://localhost:8080/main-page/${room}`)
        .then(res => res.json())
      console.log(message)
      if (message === 'used') {
        SOCKET.emit('join_room', room)
        setChatLoginAppeared(!chatLoginAppeared)
        setChatAppeared(!chatAppeared)
        setChatAccess(true)
      } else {
        setChatAccess(false)
      }
    }
  }

  const handleClickChatCreateRoom = async e => {
    if (chatUsername !== '' && room !== '' && Number.isInteger(parseInt(room))) {
      const { message } = await fetch(`http://localhost:8080/main-page/${room}/${chatUsername}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      if (message === 'chatId used') {
        setChatFree(false)
      } else {
        SOCKET.emit('join_room', room)
        setChatLoginAppeared(!chatLoginAppeared)
        setChatAppeared(!chatAppeared)
        setChatFree(true)
      }
    } else {
      console.log('Debes introducir un numero')
    }
  }
  const goOutChat = () => {
    fetch(`http://localhost:8080/main-page/${room}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json()).then(res => console.log(res))
    SOCKET.emit('disconnected', room)
    setChatAccess(null)
    setChatFree(null)
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
            {chatFree === false && <span>El id de sala esta ocupado</span>}
            {chatAccess === false && <span>La sala de chat no existe</span>}
            <button onClick={handleClickChatSelectRoom}>Select room</button>
            <button onClick={handleClickChatCreateRoom}>Create room</button>
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
