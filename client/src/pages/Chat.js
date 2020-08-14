import React, { Component } from 'react'
import axios from 'axios';
import '../sass/chat.scss';
import io from 'socket.io-client';
import $ from 'jquery'
import moment from 'moment'

const socket = io('http://localhost:5000');
// let room = '';

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            message: '',
            currentUser: {},
            users: [],
            messages: [],
            room: '',
            showChat: false,
            chatUser: {},
            typing: false,
            showModal: false,
            userTyping: ''
        }
    }

    async componentDidMount() {
        console.log('is: ' + this.props.isAuthenticated)
        if(!this.props.isAuthenticated) {
            this.props.history.push('/login')
        }

        const users = await axios.get('/api/users');
        const user = await axios.get('/api/auth/current')

        this.setState({
            users: users.data,
            currentUser: user.data
        })

        socket.on('room', ({ roomId, chatUser }) => {
            this.setState({
                room: roomId,
                chatUser,
                messages: []
            }) 
        })
    
        socket.on('message', (message) => {
            console.log(message)
            this.setState({
                messages: this.state.messages.concat(message)
            })
        })
    
        socket.on('messages', (messages) => {
            this.setState({
                messages: messages
            })
        })    

        socket.on('isTyping', (username) => {
            console.log(username)
            this.setState({
                userTyping: username
            })
        })
    }

    componentDidUpdate() {
        console.log('called')
        if(this.state.showChat) {
            $("#chat").scrollTop($("#chat")[0].scrollHeight);
        }

        if(!this.props.isAuthenticated) {
            this.props.history.push('/login')
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            typing: e.target.value.length > 0
        })

        if(e.target.value.length > 0) {
            const { currentUser, room } = this.state;
            const { username } = currentUser
            socket.emit('typing', { username, room })
        } else {
            socket.emit('stoppedTyping', this.state.room)
        }
    }

    handleSubmit = (e) => {
        const { message, currentUser, room, messages } = this.state;

        if(e.key === 'Enter') {
            socket.emit('new-message', { message, room, owner: currentUser._id })
            this.setState({
                message: ''
            });
        }
    }

    handleUserClick = (e, userId) => {
        const { currentUser } = this.state;
        this.setState({ showChat: true })
        socket.emit('open-room', { userId, loggedUser: currentUser._id });
    }

    bottomInput = () => {
        if(this.state.messages.length <= 6) {
            return true
        } else {
            return false
        }
    }

    deleteAccount = () => {
        this.setState({
            showModal: true
        })
    }

    render() {
        const { currentUser, users, message, messages, showChat, chatUser } = this.state;

        return (
            <div>
                <div className="chat-content-wrapper">
                    <div className="chat-sidebar">
                        <h1 className="title">Chat App</h1>
                        <p className="subtitle">By Meew Interns</p>
                        <div className="users-list">
                            {users && users.map(user => {
                                if(user._id === currentUser._id) return;
                                
                                return (
                                    <div key={user._id} onClick={(e) => this.handleUserClick(e, user._id)} className="user">
                                        <p>{user.username}</p>

                                        <div className="status-star">&#9734;</div>
                                        <div className="status-circle"></div>
                                    </div>
                                )
                            })}
                            
                        </div>
                        <div className="logged-in-user">
                            <button onClick={this.deleteAccount} className="delete-btn">Delete Account</button>
                            <p>Logged in: <span>{currentUser.username}</span></p>
                        </div>
                    </div>
                    <div className="chat-content">
                        {!showChat && <p>Choose a user in the sidebar to start or continue a private chat.</p>}
                        {showChat && 
                        <div>
                            <div>
                                <h1 className="chat-user"><span>Chatting with: </span>{chatUser.username}</h1>
                            </div>
                            <div className="chat-window-wrapper">
                                <div id="chat" className="chat-window">
                                    {this.state.messages.map(message => {
                                        const isOwner = message.owner.username === currentUser.username
                                        return (
                                            <div key={message._id} className="message-wrapper">
                                                <div className={'message-content ' + isOwner} key={message._id}>
                                                    <p className={'message ' + isOwner}>{message.message}</p>
                                                    <p className={'message-time ' + isOwner}>{moment(message.createdAt).format('DD/MM')} <span>{moment(message.createdAt).format('H:mm')} </span></p>
                                                </div>
                                            </div>
                                        )
                                    })}
                        
                                    <input value={message} onKeyDown={this.handleSubmit} onChange={this.handleInputChange} name="message" className={"message-input " + this.bottomInput()} placeholder="Write a message..." />
                                </div>
                            </div>
                            {this.state.userTyping && this.state.userTyping !== this.state.currentUser.username &&  <p className="typing">{this.state.userTyping} is typing...</p>}
                        </div>}
                    </div>
                </div>

                {this.state.showModal &&<div className="delete-modal">
                    
                    <div className="overlay"></div>
                    <div className="modal-content">
                        <p>Are you sure, you want to delete your account?</p>
                        <div className="buttons">
                            <button onClick={() => this.props.deleteAccount(currentUser._id)} className="yes">Yes</button>
                            <button onClick={() => this.setState({ showModal: false})}>Cancel</button>
                        </div>
   
                    </div>
                </div>}
            </div>
        )
    }
}

export default Chat;

