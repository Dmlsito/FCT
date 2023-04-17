import './css/Home.css'

const handleClick = ({ }) => {

}
const ScrollableTable = ({ CardInfo, handleClick }) => {
  return (
    <div className='table'>
      <h3>Machine status</h3>
      <CardInfo />
      <CardInfo />
      <CardInfo />
      <CardInfo />
      <CardInfo />
      <button className='table-button' onClick={handleClick}>+</button>
    </div>
  )
}

const CardInfo = () => {
  const number = Math.trunc(Math.random() * 20)
  return (
    <main className='card-body'>
      <header className='card-header'>
        {number}
      </header>
      <article className='card-article'>maquina ocupada</article>
    </main>
  )
}
export const Home = () => {
  return (
    <main className='home'>
      <picture className='home-picture'>
        <img src='images/plano.jpeg' />
      </picture>
      <ScrollableTable CardInfo={CardInfo} />
    </main>
  )
}
