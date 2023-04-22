import '../css/Login.css'
import{ Link } from 'react-router-dom'
import { useState } from 'react'


export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [path, setPath] = useState('/login')
    const [errors, setErrors] = useState(null)

    const getUsername = (event) => {
        setUsername(event.target.value)
    }
    const getPassword = (event) => {
        setPassword(event.target.value)
    }
    // To do //
    const handleSubmit = async (event) => {
        let data = username
        data = JSON.stringify(data)
        
        const errs = await fetch("http://localhost:8080/login", {
           method: "POST",
           headers: {
               "Content-Type": "application/json"
           },
           body: data
         }).then(res => res.json())
         
         console.log(errs)
         event.preventDefault()
        
    }
    return (
        <main className='log'>
            <h2>Wellcome</h2>
            <form className='log-form' onSubmit={handleSubmit}>
                <input placeholder='Username' onChange={getUsername} name='username'></input>
                <input placeholder='Password' onChange={getPassword} name='password'></input>
                <button ><Link to={'/main-page'}>Sig in</Link></button>
            </form>
        </main>
    )
}   