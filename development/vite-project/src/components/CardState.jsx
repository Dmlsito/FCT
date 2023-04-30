export const CardState = ({ state }) => {
  return (
    <main className='card-body'>
      <header className='card-header'>DATE</header>
      <article className='card-article'>{
          state.state === 0
            ? <span className='card-article-text'>machine {state.id}: <span className='card-article-text-free'> free</span></span>
            : <span className='card-article-text'>machine {state.id}: <span className='card-article-text-using'> in use</span></span>
          }
      </article>
    </main>
  )
}
