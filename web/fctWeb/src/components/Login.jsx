import './css/login.css'
import{ Link } from 'react-router-dom'

export const Login = () => {
    return (
        <main className='log'>
            <h2>Wellcome</h2>
            <form className='log-form'>
                <input placeholder='Username'></input>
                <input placeholder='Password'></input>
                <button><Link to='/main-page' style={{
                    color: '#fff',
                    textDecoration: 'inherit',
                    }}>Sig in</Link></button>
            </form>
        </main>
    )
}   