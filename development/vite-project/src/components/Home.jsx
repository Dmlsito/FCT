import '../css/Home.css'
import { useState, useEffect } from 'react'
import { TableState } from './TableState'

export const Home = () => {
  const [stateMachine, setStateMachine] = useState([''])
  const [indexStart, setIndexStart] = useState(0)

  useEffect(() => {
    fetch('http://localhost:8080/main-page')
      .then(res => res.json())
      .then(res => setStateMachine(res))
  }, [indexStart])

  const handleClick = () => {
    if (indexStart === 12) { setIndexStart(0) } else {
      setIndexStart(indexStart + 6)
    }
  }

  return (
    <main className='home'>
      <picture className='home-picture'>
        <img src='../images/pngDani.png' />
      </picture>
      <article>
        <TableState stateMachine={stateMachine} indexStart={indexStart} handleClick={handleClick} />
      </article>
    </main>
  )
}
