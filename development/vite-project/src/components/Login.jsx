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
      e.preventDefault()
      setShowErros(true)
      setUsername('')
    } else {
      setShowErros(false)
      setPassword('')
    }
  }

  return (
    <main className='log'>
      <h2>Wellcome</h2>
      <form className='log-form' action='/main-page' onSubmit={handleSubmit}>
        <input placeholder='Username' onChange={getUsername} value={username} onBlur={handleClick} name='name' />
        <input placeholder='Password' onChange={getPassword} value={password} onBlur={handleClick} name='password' />
        {showErrors && <span>This user doesn't exist</span>}
        <button type='submit'>Sig in</button>
      </form>
    </main>
  )
}

/*
Otra forma de poder recoger los valores de los inputs del formulario seria la siguiente
cosnt fields = new window.FormData(event.target)
// Ponemos name porque en este caso recuperamos el valor del input name, pero podriamos reuperar tambien el valor del campo password
cosnt query = fields.get('name')

 */
