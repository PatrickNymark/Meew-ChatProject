import React from 'react'
import { Link } from 'react-router-dom'
import '../sass/login.scss'
export default function Login() {
    return (
        <div className="login-wrapper">

            <div className="login-container">


                <div className="email">
                    <h1>Login Page</h1>

                    <input className="input" type="text" placeholder="Email address" name="email" />
                    <input className="input" type="text" placeholder="Password" name="password" />
                    <button className="login-btn">Log In</button>
                    <p>Not Registered? <Link className="click-here" to="/register">Click Here</Link></p>
                </div>
            </div>
        </div>
    )
}
