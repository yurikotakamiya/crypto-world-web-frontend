import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Orders from './components/Orders'
import Logout from './components/Logout'
import Trades from './components/Trades'
import Settings from './components/Settings'
import ApiEdit from './components/ApiEdit'

function App() {
  return (
    <Router>
      <Header />
      <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='orders' element={<Orders />} />
          <Route path='logout' element={<Logout />} />
          <Route path='trades' element={<Trades />} />
          <Route path='settings' element={<Settings />} />
          <Route path='settings/:exchange_id' element={<ApiEdit />} />  
        </Routes>
    </Router>
    
    
  )
}

export default App