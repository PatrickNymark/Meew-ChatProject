import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

import '../sass/login.scss'

export default function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const submit = (e) => {
        e.preventDefault()

        axios.post('/api/auth/login', { username, password }).then(res => {
            console.log(res.data)
            if(res.status === 200) {
                window.localStorage.setItem('token', res.data.jwtToken)
                props.history.push('/chat')
            }
        })
    }

    return (
        <div className="login-wrapper">

            <div className="login-container">


                <div className="email">
                    <h1>Login Page</h1>
                    <form onSubmit={submit}>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder="Username" name="username" />
                        <input onChange={e => setPassword(e.target.value)} className="input" type="text" placeholder="Password" name="password" />
                        <button className="login-btn" type="submit">Log In</button>
                        <p>Not Registered? <Link className="click-here" to="/register">Click Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
