import React, { useState } from 'react';
import axios from 'axios';
import '../sass/register.scss'

export default function Register(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors]  = useState()
    const submit = (e) => {
        e.preventDefault()

        axios.post('/api/auth/register', { username, password }).then(res => {
            props.history.push('/login')
        }).catch(err => {
            setErrors(err.response.data)
        })
    }

    return (
        <div className="register-wrapper">
            <div className = "register-container">
                <div className="register">
                    <h1 className="register-header">Register Here</h1>
                    {errors && errors.error.map((err) => {
                        return <p className="error-message">{err}</p>
                    })}
                    <form onSubmit={submit}>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder="Username" name="email" />
                        <input onChange={e => setPassword(e.target.value)} className="input" type="password" placeholder="Password" name="password" />
                        <button className="register-btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
