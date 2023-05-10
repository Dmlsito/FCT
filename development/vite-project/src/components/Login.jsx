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

  const validation = async ({ username, password }) => {
    const objectUser = { name: username, password }
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
