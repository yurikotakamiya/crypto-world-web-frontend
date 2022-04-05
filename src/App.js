import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'
import Register from './components/Register'
import Orders from './components/Orders'
import Logout from './components/Logout'
import Trades from './components/Trades'
import Settings from './components/Settings'
import ApiEdit from './components/ApiEdit'
import UsernameEdit from './components/UsernameEdit'
import EmailEdit from './components/EmailEdit'
import PasswordEdit from './components/PasswordEdit'



function App() {
  return (
    <Router>
      <NavBar />
      <Header />
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
          <Route path='settings/username/:user_id' element={<UsernameEdit />} />
          <Route path='settings/email/:user_id' element={<EmailEdit />} />
          <Route path='settings/password/:user_id' element={<PasswordEdit />} />

        </Routes>
      <Footer />  
    </Router>
    
    
  )
}

export default App