import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';
import { setAuthToken } from './helpers/auth-header';
import axios from 'axios';
import decode from 'jwt-decode';

// pages
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';

// components
import Navbar from './components/navbar';

function App() {
	const [isAuthenticated, setAuthenticated] = useState(false)

	useEffect(() => {
		const token = window.localStorage.getItem('token')

		if(token) {
			const decoded = decode(token)
      
			if(Date.now() <= decoded.exp * 1000) {
				setAuthToken(token)
				setAuthenticated(true)
			} else {
				window.localStorage.removeItem('token')
				window.location = '/'
			}
		}
	}, [])

	const deleteAccount = (id) => {
        axios.post('/api/users', { id }).then(res => {
			setAuthenticated(false)
			setAuthToken({})
			localStorage.removeItem('token')
            window.location = '/login'
        })
    }

	return (
		<Router className="App">
			<Navbar setAuthenticated={setAuthenticated} isAuthenticated={isAuthenticated} />
			<Route exact path="/login" render={(props) => (
				<Login {...props} setAuthenticated={setAuthenticated} />
			)} />
			<Route exact path="/chat" render={(props) => (
				<Chat {...props} deleteAccount={deleteAccount} isAuthenticated={isAuthenticated} />
			)} />
			<Route exact path="/register" component={Register} />
		</Router>
	);
}

export default App;
