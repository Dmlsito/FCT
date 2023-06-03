import { useState } from 'react'

export const useRooms = ({ chatUsername, room, SOCKET }) => {
  const [chatAccess, setChatAccess] = useState(null)
  const [chatFree, setChatFree] = useState(null)
  const [chatLoginAppeared, setChatLoginAppeared] = useState(false)
  const [chatAppeared, setChatAppeared] = useState(false)

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

  return { handleClickChatSelectRoom, handleClickChatCreateRoom }
}
