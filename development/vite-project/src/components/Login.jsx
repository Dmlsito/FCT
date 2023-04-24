import '../css/Login.css'
import { useState } from 'react'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(true)
  const [showErrors, setShowErros] = useState(null)

  const getUsername = e => setUsername(e.target.value)

  const getPassword = e => setPassword(e.target.value)

  const handleClick = async e => {
    const objectUser = { name: username, password }

    const errs = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectUser)
    }).then(res => res.json())

    console.log(errs.error)

    if (errs.error) setErrors(true)
    else if (!errs.error) setErrors(false)
  }

  const handleSubmit = e => {
    if (errors) {
      setShowErros(true)
      e.preventDefault()
    } else setShowErros(false)
  }

  return (
    <main className='log'>
      <h2>Wellcome</h2>
      <form className='log-form' action='/main-page'>
        <input placeholder='Username' onChange={getUsername} onBlur={handleClick} name='name' />
        <input placeholder='Password' onChange={getPassword} onBlur={handleClick} name='password' />
        {showErrors && <span>Usuario no valido</span>}
        <button onClick={handleSubmit}>Sig in</button>
      </form>
    </main>
  )
}
