import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../Pages/Home'
import LandingPage from '../Pages/Landing'
import Register from '../Pages/Register'
import Login from '../Pages/Login'

const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>

      </Routes>
    </div>
  )
}

export default Routing
