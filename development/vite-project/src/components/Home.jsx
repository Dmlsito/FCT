import '../css/Home.css'
import { useState, useEffect } from 'react'
import { TableState } from './TableState'
export const Home = () => {
  const [stateMachine, setStateMachine] = useState([''])
  const [indexStart, setIndexStart] = useState(0)

  const getData = async () => {
    // Take the data //
    const data = await fetch('http://localhost:8080/main-page')
      .then(res => res.json())
    setStateMachine(data)
  }
  useEffect(() => {
    getData()
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
