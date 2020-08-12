import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// pages
import Login from './pages/Login';
import Chat from './pages/Chat';
import Register from './pages/Register';

// components
import Navbar from './components/navbar';

function App() {

  useEffect(() => {
    console.log('loadedd')
    const token = window.localStorage.getItem('token')
    console.log(token)

  })

  return (
    <Router className="App">
        <Navbar />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/chat" component={Chat} />
    </Router>
  );
}

export default App;
