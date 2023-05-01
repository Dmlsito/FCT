export const CardState = ({ state }) => {
  const date = new Date(state.LastTimeUsed)
  return (
    <main className='card-body'>
      <header className='card-header'>
        <span>{`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`}</span>
        <span>{`${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}`}</span>
      </header>
      <article className='card-article'>{
          state.state === 0
            ? <span className='card-article-text'>machine {state.id}: <span className='card-article-text-free'> free</span></span>
            : <span className='card-article-text'>machine {state.id}: <span className='card-article-text-using'> in use</span></span>
          }
      </article>
    </main>
  )
}

// `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}/${date.getUTCHours()}:${date.getMinutes()}:${date.getSeconds()}` //