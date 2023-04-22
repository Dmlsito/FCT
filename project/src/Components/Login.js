import './css/Login.css'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'

export const Login = () => {
  const sendData = (event) => {
    
    const username = document.getElementById('username').value 
    const password = document.getElementById('password').value// value of username input
    
    // const password = document.getElementById('password').value  // // value of password input //
    fetch('http://localhost:8080/login').then(res => res.json()).then(res => console.log(res))

    event.preventDefault()
  }
  // const rute = sendData ? '/main-page' : '/login'
  return (
    <main className='log'>
      <h2>Wellcome</h2>
      <form lcassName='log-form'  onSubmit={sendData}>
        <input required placeholder='Username' name='name' id='username' />
        <input required placeholder='Password' name='password' id='password' />
        <button type='submit'>Sig in
        </button>
      </form>
    </main>
  )
}
