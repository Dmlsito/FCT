import { Link } from 'react-router-dom'
import '../css/Header.css'
export const Entry = () => {
  return (
    <main className='entry'>
      <Link
        to='/login' style={{
          color: '#fff',
          textDecoration: 'none',
          opacity: '0.6',
          fontSize: '80px',
          fontWeight: 'bold'
        }}
      ><h1>WELCOM@!!</h1>
      </Link>
    </main>
  )
}
