import { useState, useEffect } from 'react'
import '../css/Chat.css'
import { BsFillSendFill } from 'react-icons/bs'
export const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const handleChange = e => {
    setCurrentMessage(e.target.value)
  }
  const sendMessage = async () => {
    if (currentMessage !== '') {
      // Creamos un objeto que contenga toda la informacion del mensaje
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit('send_message', messageData)
    }
    setCurrentMessage('')
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data)
    })
  }, [socket])
  return (
    <main className='chat-main'>
      <header className='chat-main-header'>
        <p>Live chat</p>
      </header>
      <body className='chat-main-body' />
      <footer className='chat-main-footer'>
        <input type='text' placeholder='Say something....' onChange={handleChange} value={currentMessage} />
        <button onClick={sendMessage} className='chat-main-footer-button'><BsFillSendFill /></button>
      </footer>
    </main>
  )
}
