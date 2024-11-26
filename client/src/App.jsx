import React from 'react'
import Home from './container/Home/Home'
import Specialization from './container/Specialization/Specialization';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
