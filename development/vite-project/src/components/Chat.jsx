/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react'
import '../css/Chat.css'
import { BsFillSendFill } from 'react-icons/bs'
import ScrollToBottom from 'react-scroll-to-bottom'
import { HiOutlineReply } from 'react-icons/hi'

export const Chat = ({ socket, username, room, clear }) => {
  const [currentMessage, setCurrentMessage] = useState('')
  const [receiveMessage, setReceiveMessage] = useState([])
  const handleChange = e => {
    setCurrentMessage(e.target.value)
  }
  const sendMessage = async () => {
    if (currentMessage !== '') {
      // Creamos un objeto que contenga toda la informacion del mensaje
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
      }

      await socket.emit('send_message', messageData)
      // Add our messages to the list //
      setReceiveMessage((list) => [...list, messageData])
    }
    setCurrentMessage('')
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setReceiveMessage((list) => [...list, data])
    })
  }, [socket])

  useEffect(() => {
    // Cada vez que salga de la sala reiniciaremos los mensajes
    setReceiveMessage([])
  }, [clear])
  return (
    <main className='chat-main'>
      <header className='chat-main-header'>
        <p>Live chat</p>
      </header>
      <div className='chat-main-prueba'>
        <ScrollToBottom className='chat-main-scroll'>
          <div className='chat-main-body'>
            {
          receiveMessage.map((messageContent) => {
            return (
              <div className='message' id={username === messageContent.author ? 'you' : 'other'}>

                <div className='message-header'>
                  <p>{messageContent.message}</p>
                </div>
                <div className='message-meta'>
                  <p>{messageContent.time}</p>
                  <p>{messageContent.author}</p>
                </div>

              </div>
            )
          })
        }
          </div>
        </ScrollToBottom>
      </div>
      <div className='chat-main-footer'>
        <input
          type='text' placeholder='Say something....' onChange={handleChange} value={currentMessage}
          onKeyPress={e => { e.key === 'Enter' && sendMessage() }}
        />
        <button onClick={sendMessage} className='chat-main-footer-button'><BsFillSendFill /></button>
      </div>
    </main>
  )
}
