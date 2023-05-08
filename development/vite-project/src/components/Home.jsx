import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
import { io } from 'socket.io-client'

// Conectamos el front con el back, como hicimos con el back // 
const SOCKET = io.connect('http://localhost:8080')

export const Home = () => {
  const [indexStart, setIndexStart] = useState(0)
  const handleClick = () => {
    if (indexStart === 12) { setIndexStart(0) } else {
      setIndexStart(indexStart + 6)
    }
  }

  return (
    <main className='home'>
      <div className='home-picture'>
        <img src='../images/pngDani.png' className='home-picture-image' />
      </div>
      <article className='home-article'>
        <TableState indexStart={indexStart} handleClick={handleClick} />
      </article>
    </main>
  )
}
