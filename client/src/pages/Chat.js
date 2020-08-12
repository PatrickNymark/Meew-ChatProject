import React, { useState } from 'react'
import '../sass/chat.scss';

export default function Chat() {
    const [messageValue, setMessage] = useState("")


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
