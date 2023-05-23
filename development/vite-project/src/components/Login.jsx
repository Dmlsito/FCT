import '../css/Login.css'
import { useState, useEffect } from 'react'
import { Form } from './Form'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(true)
  const [showErrors, setShowErros] = useState(null)

  const getUsername = e => setUsername(e.target.value)

  const getPassword = e => setPassword(e.target.value)
  // Con esta funcion validamos que el usuairo y contrasena escritos sean correctos //
  const validation = async ({ username, password }) => {
    // Creo un objeto que tenga dos propiedades, para poder mandarle la informacion en formato JSON //
    const objectUser = { name: username, password }
    // AQUI CONECTAS CON EL SERVIDOR
    // Te mando el json con el nombre y la contrasena y accedo a tu respuesta //
    const { error } = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objectUser)
    }).then(res => res.json())

    setErrors(error)
  }

  const handleSubmit = async e => {
    if (errors) {
      e.preventDefault()
      setUsername('')
      setPassword('')
      setShowErros(true)
    } else {
      setShowErros(false)
    }
  }

  useEffect(() => {
    validation({ username, password })
  }, [username, password])

  return (
    <Form
      handleSubmit={handleSubmit} getPassword={getPassword}
      getUsername={getUsername} password={password} username={username} showErrors={showErrors}
    />
  )
}
