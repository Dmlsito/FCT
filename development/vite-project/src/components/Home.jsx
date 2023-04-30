import '../css/Home.css'
import { useState } from 'react'
import { TableState } from './TableState'
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
