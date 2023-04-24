import { Link } from 'react-router-dom'
import '../css/Entry.css'
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
      ><h1>WELLCOME</h1>
      </Link>
    </main>
  )
}
