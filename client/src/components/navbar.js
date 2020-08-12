import React from 'react'
import { Link } from 'react-router-dom';

import '../sass/navbar.scss'

export default function Navbar({ isAuthenticated }) {
    console.log(isAuthenticated)
    return (
        <div className="navbar-wrapper">
            <ul className="navbar">
                <li className="item"><Link to="/">Home</Link></li>
                {isAuthenticated && <li className="item"><Link to="/login">Logout</Link></li>}
                {!isAuthenticated && <li className="item"><Link to="/login">Login</Link></li>}

                <li className="item"><Link to="/chat">Chat</Link></li>
            </ul>
        </div>
    )
}
