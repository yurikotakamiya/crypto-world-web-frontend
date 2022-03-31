import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Orders from './components/Orders'
import Logout from './components/Logout'

function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='orders' element={<Orders />} />
          <Route path='logout' element={<Logout />} />
          
        </Routes>
    </Router>
    
    
  )
}

export default App