import '../css/Login.css'
import { useState } from 'react'
export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(true)
  const [showErrors, setShowErros] = useState(null)

  const getUsername = e => setUsername(e.target.value)

  const getPassword = e => setPassword(e.target.value)

  const validation = async () => {
    let error
    const objectUser = { name: username, password }

    const errs = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectUser)
    }).then(res => res.json())

    if (errs.error) error = true
    else if (!errs.error) error = false

    return error
  }

  const handleBlur = async () => {
    validation().then(res => setErrors(res))
  }

  const handleSubmit = e => {
    if (errors) {
      setUsername('')
      setPassword('')
      e.preventDefault()
      setShowErros(true)
    } else {
      setShowErros(false)
    }
  }

  return (
    <main className='main'>
      <div className='main-log'>
        <h2>Wellcome</h2>
        <form className='log-form' action='/main-page' onSubmit={handleSubmit}>
          <input placeholder='Username' onChange={getUsername} value={username} onBlur={handleBlur} name='name' />
          <input placeholder='Password' onChange={getPassword} value={password} onBlur={handleBlur} name='password' />
          {showErrors && <span>This user doesn't exist</span>}
          <button type='submit' className='button'>Sig in</button>
        </form>
      </div>
    </main>
  )
}

/*
Otra forma de poder recoger los valores de los inputs del formulario seria la siguiente
cosnt fields = new window.FormData(event.target)
// Ponemos name porque en este caso recuperamos el valor del input name, pero podriamos reuperar tambien el valor del campo password
cosnt query = fields.get('name')

 */
