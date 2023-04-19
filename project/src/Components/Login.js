import './css/Login.css'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

export const Login = () => {
  return (
    <main className='log'>
      <h2>Wellcome</h2>
      <form className='log-form'>
        <input placeholder='Username' />
        <input placeholder='Password' />
        <button><Link
          to='/main-page' style={{
            color: '#fff',
            textDecoration: 'inherit'
          }}>Sig in</Link>
        </button>
      </form>
    </main>
  )
}
