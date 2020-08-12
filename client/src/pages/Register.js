import React from 'react'
import '../sass/register.scss'

export default function Register() {
    return (
        <div className="register-wrapper">

            <div className = "register-container">

                <div className="register">

                    <h1>Register Here</h1>

                    <input className="input" type="text" placeholder="Email address" name="email" />
                    <input className="input" type="text" placeholder="Password" name="password" />
                    <button className="register-btn">Register</button>
                </div>
            </div>
        </div>
    )
}
