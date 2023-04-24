import '../css/Home.css'
import { useState, useEffect } from 'react'

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
        <div className='table'>
          <h3>Machine status</h3>
          {
            stateMachine.splice(indexStart, 6).map((state) => {
              return (
                <main className='card-body' key={state.id}>
                  <header className='card-header'>FECHA</header>
                  <article className='card-article'>{
                  state.state === 0
                    ? <span className='card-article-text'>maquina {state.id}: <span className='card-article-text-free'> libre</span></span>
                    : <span className='card-article-text'>maquina {state.id}: <span className='card-article-text-using'> libre</span></span>
                  }
                  </article>
                </main>
              )
            })
          }
          <button className='table-button' onClick={handleClick}>+</button>
        </div>
      </article>

    </main>
  )
}
