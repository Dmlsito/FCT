export const CardState = ({ state }) => {
  return (
    <main className='card-body'>
      <header className='card-header'>FECHA</header>
      <article className='card-article'>{
          state.state === 0
            ? <span className='card-article-text'>maquina {state.id}: <span className='card-article-text-free'> libre</span></span>
            : <span className='card-article-text'>maquina {state.id}: <span className='card-article-text-using'> libre</span></span>
          }
      </article>
    </main>
  )
}
