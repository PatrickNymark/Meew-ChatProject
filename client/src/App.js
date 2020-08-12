import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { setAuthToken } from './helpers/auth-header';

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
			// setAuthToken(token)
			if(Date.now() >= decoded.exp * 1000) {
				window.location = '/login'
			} else {
				setAuthToken(token)
				setAuthenticated(true)
			}
		}
	})

	return (
		<Router className="App">
			<Navbar isAuthenticated={isAuthenticated} />
			<Route exact path="/login" render={(props) => (
				<Login {...props} setAuthenticated={setAuthenticated} />
			)} />
			<Route exact path="/register" component={Register} />
			<Route exact path="/chat" component={Chat} />
		</Router>
	);
}

export default App;
