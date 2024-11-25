import React from 'react'
import Home from './container/Home/Home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Specialization from './container/Specialization/Specialization';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/specialization' element={<Specialization />} />
      </Routes>
    </Router>
  )
}

export default App
