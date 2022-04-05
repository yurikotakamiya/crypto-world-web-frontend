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
import NewApi from './components/NewApi'
import StrategyConfig from './components/StrategyConfig'



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
          <Route exact path='settings' element={<Settings />} />
          <Route exact path='settings/strategy_config' element={<StrategyConfig />} />
          <Route exact path='settings/:exchange_id' element={<ApiEdit />} />  
          <Route exact path='settings/username/:user_id' element={<UsernameEdit />} />
          <Route exact path='settings/email/:user_id' element={<EmailEdit />} />
          <Route exact path='settings/password/:user_id' element={<PasswordEdit />} />
          <Route exact path='settings/api_config' element={<NewApi />} />
        </Routes>
      <Footer />  
    </Router>
    
    
  )
}

export default App