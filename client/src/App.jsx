import React from 'react'
import Home from './container/Home/Home'
import Specialization from './container/Specialization/Specialization';
import PrescriptionUpload from './container/PrescriptionUpload/PrescriptionUpload';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeriodTracker from './container/PeriodTracker/PeriodTracker';
import CustomerSupport from './container/CustomerSupport/CustomerSupport';
import FAQs from './container/FAQ/Faqs';
import HealthRecord from './container/HealthRecord/HealthRecord';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/specialization' element={<Specialization />} />
        <Route path='/prescription-upload' element={<PrescriptionUpload />} />
        <Route path='/period-tracker' element={<PeriodTracker />} />
        <Route path='/customer-support' element={<CustomerSupport />} />
        <Route path='/faqs' element={<FAQs />} />
        <Route path='/healthrecord' element={<HealthRecord />} />
      </Routes>
    </Router>
  )
}

export default App
