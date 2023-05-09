/* eslint-disable no-useless-return */
import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
import { FaRegCommentDots } from 'react-icons/fa'
import { Chat } from './Chat'

export const Home = () => {
  const [indexStart, setIndexStart] = useState(0)
  const [chatLoginAppeared, setChatLoginAppeared] = useState(false)
  const [chatAppeared, setChatAppeared] = useState(false)
  const [click, setClick] = useState(false)
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

  const handleClickChat = e => {
    setChatLoginAppeared(!chatLoginAppeared)
    setChatAppeared(!chatAppeared)
  }
  const goOutChat = () => {
    setChatAppeared(false)
    setChatLoginAppeared(true)
  }
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
            <input placeholder='username' name='chatUsername' />
            <input placeholder='room id' name='chatRoomName' />
            <button onClick={handleClickChat}>Create room</button>
          </aside>}
        <aside className={classNameChat}>
          <button onClick={goOutChat}>Irse</button>
          <Chat />
        </aside>
      </div>
      <div className='home-aside'>
        <button onClick={chat}><FaRegCommentDots className='home-aside-icon' /></button>
      </div>
    </main>
  )
}
