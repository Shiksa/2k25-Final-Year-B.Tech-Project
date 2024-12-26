import React from 'react'
import Home from './container/Home/Home'
import Specialization from './container/Specialization/Specialization';
import PrescriptionUpload from './container/PrescriptionUpload/PrescriptionUpload';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PeriodTracker from './container/PeriodTracker/PeriodTracker';
import CustomerSupport from './container/CustomerSupport/CustomerSupport';
import FAQs from './container/FAQ/Faqs';
import HealthRecord from './container/HealthRecord/HealthRecord';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import DoctorCard from './container/Specialization/components/DoctorsCard/DoctorCard';

const App = () => {
  return (<AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/prescription-upload" element={<PrescriptionUpload />} />
          <Route path="/period-tracker" element={<PeriodTracker />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/health-record" element={<HealthRecord />} />
          <Route path="/doctors" element={<DoctorCard />} />
          <Route path="/specialization" element={<Specialization />} />
          <Route path="/specialization/:specialization" element={<DoctorCard />} />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  )
}

export default App
