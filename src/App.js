import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import NavBar from './components/NavBar'

function App() {
  return (
    <Router>
      <NavBar />
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='home' element={<Home />} />

        </Routes>
    </Router>
    
    
  )
}

export default App