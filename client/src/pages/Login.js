import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { setAuthToken } from '../helpers/auth-header';
import axios from 'axios';

import '../sass/login.scss'

export default function Login(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState('')

    const submit = (e) => {
        e.preventDefault()

        axios.post('/api/auth/login', { username, password }).then(res => {
            const { jwtToken } = res.data;
            localStorage.setItem('token', jwtToken)
            setAuthToken(jwtToken)

            props.setAuthenticated(true)
            props.history.push('/chat')
        }).catch(err => {
            setErrors(err.response.data)
        })
    }

    return (
        <div className="login-wrapper">
            <div className="login-container">
                <div className="email">
                    <h1 className="login-header">Login Page</h1>
                    {errors.error && <p className="error-message">{errors.error}</p>}
                    <form onSubmit={submit}>
                        <input onChange={e => setUsername(e.target.value)} className="input" type="text" placeholder="Username" name="username" />
                        <input onChange={e => setPassword(e.target.value)} className="input" type="password" placeholder="Password" name="password" />
                        <button className="login-btn" type="submit">Log In</button>
                        <p>Not Registered? <Link className="click-here" to="/register">Click Here</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}
