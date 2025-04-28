import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientInfo } from './components/patient/PatientInfo';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patient/:patientId" element={<PatientInfo/>} />
      </Routes>
    </Router>
  )
}

export default App
 