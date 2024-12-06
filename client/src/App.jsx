import React from 'react'
import Home from './container/Home/Home'
import Specialization from './container/Specialization/Specialization';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FAQs from './container/FAQ/Faqs';
import HealthRecord from './container/HealthRecord/HealthRecord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/specialization' element={<Specialization />} />
        <Route path='/faqs' element={<FAQs/>} />
        <Route path='/healthrecord' element={<HealthRecord/>} />
      </Routes>
    </Router>
  )
}

export default App
