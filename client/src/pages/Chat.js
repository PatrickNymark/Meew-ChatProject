import React, { useState, useEffect } from 'react'
import axios from 'axios';
import '../sass/chat.scss';

export default function Chat(props) {
    const [messageValue, setMessage] = useState("")
    const [user, setUser] = useState("")

    useEffect(() => {
        axios.get('/api/auth/current').then(res => {
            setUser(res.data)
        })
    }, [])

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        if(e.key === 'Enter'){
            setMessage("")
        }
    }

    return (
        <div>
            <div className="chat-content-wrapper">
                <div className="chat-sidebar">
                    <h1 className="title">Chat App</h1>
                    <p className="subtitle">By Meew Interns</p>
                    <div className="users-list">
                        <div className="user">
                            <p>Patrick Nymark</p>

                            <div className="status-star">&#9734;</div>
                            <div className="status-circle"></div>
                        </div>
                    </div>
                    <p className="logged-in-user">Logged in: <span>{user.username}</span></p>
                </div>
                <div className="chat-content">
                    <h1>Content</h1>
                    <div className="chat-window-wrapper">
                        <div className="chat-window">
                            <p>{messageValue}</p>
                
                            <input value={messageValue} onKeyDown={handleSubmit} onChange={handleInputChange} className="message-input" placeholder="Write a message..." />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
