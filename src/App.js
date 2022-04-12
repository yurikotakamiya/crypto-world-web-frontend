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
import UsernameEdit from './components/UsernameEdit'
import EmailEdit from './components/EmailEdit'
import PasswordEdit from './components/PasswordEdit'
import ApiKeys from './components/ApiKeys'
import MonitorConfigs from './components/MonitorConfigs'
import MonitorConfigsEdit from './components/MonitorConfigsEdit'
import MonitorConfigsDelete from './components/MonitorConfigsDelete'
import StrategyConfigs from './components/StrategyConfigs'
import StrategyConfigsEdit from './components/StrategyConfigsEdit'
import StrategyConfigsDelete from './components/StrategyConfigsDelete'
import NewStrategyConfig from './components/NewStrategyConfig'
import NewMonitorConfig from './components/NewMonitorConfig'
import NewApi from './components/NewApi'

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
          <Route exact path='settings/strategy_configs' element={<StrategyConfigs />} />
          <Route exact path='settings/monitor_configs' element={<MonitorConfigs />} />
          <Route exact path='settings/monitor_configs/edit/:id' element={<MonitorConfigsEdit />} />
          <Route exact path='settings/monitor_configs/delete/:id' element={<MonitorConfigsDelete />} />
          <Route exact path='settings/strategy_configs/edit/:id' element={<StrategyConfigsEdit />} />
          <Route exact path='settings/strategy_configs/delete/:id' element={<StrategyConfigsDelete />} />
          <Route exact path='settings/new_strategy_configs' element={<NewStrategyConfig />} />
          <Route exact path='settings/new_monitor_configs' element={<NewMonitorConfig />} />
          <Route exact path='settings/api_config/edit/:exchange_id' element={<ApiEdit />} />  
          <Route exact path='settings/api_config' element={<ApiKeys />} />
          <Route exact path='settings/new_api_config' element={<NewApi />} />
          <Route exact path='settings/username/:user_id' element={<UsernameEdit />} />
          <Route exact path='settings/email/:user_id' element={<EmailEdit />} />
          <Route exact path='settings/password/:user_id' element={<PasswordEdit />} />
        </Routes>
      
    </Router>
    
    
  )
}

export default App