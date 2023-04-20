import './css/Login.css'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

const handleClick = async (event) => {
  const data = await fetch('http://localhost:8080/login')
  .then(res => res.json())
  console.log(data)
  event.preventDefault()
}
export const Login = () => {
  return (
    <main className='log'>
      <h2>Wellcome</h2>
      <form className='log-form' action='/main-page' onSubmit={handleClick}>
        <input required placeholder='Username' />
        <input required placeholder='Password' />
        <button type='submit'>Sing in
        </button>
      </form>
    </main>
  )
}
