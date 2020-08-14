import React from 'react'
import { Link } from 'react-router-dom';
import { setAuthToken } from '../helpers/auth-header';

import '../sass/navbar.scss'

export default function Navbar({ isAuthenticated, setAuthenticated }) {
    
    const logout = () => {
        localStorage.removeItem('token')
        setAuthToken({})
        setAuthenticated(false)
    }
    return (
        <div className="navbar-wrapper">
            <ul className="navbar">
                <li className="item"><Link to="/">Home</Link></li>

                {isAuthenticated && <li className="item"><span onClick={logout}>Logout</span></li>}
                {!isAuthenticated && <li className="item"><Link to="/login">Login</Link></li>}

                <li className="item"><Link to="/chat">Chat</Link></li>
            </ul>
        </div>
    )
}
