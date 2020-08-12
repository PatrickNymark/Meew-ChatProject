import React, { useState } from 'react';
import axios from 'axios';
import '../sass/register.scss'

export default function Register(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submit = (e) => {
        e.preventDefault()

        axios.post('/api/auth/register', { username, password }).then(res => {
            props.history.push('/login')
        })
    }

    return (
        <div className="register-wrapper">
            <div className = "register-container">
                <div className="register">
                    <h1>Register Here</h1>
                    <form onSubmit={submit}>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder="Email address" name="email" />
                        <input onChange={e => setPassword(e.target.value)} className="input" type="text" placeholder="Password" name="password" />
                        <button className="register-btn">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
