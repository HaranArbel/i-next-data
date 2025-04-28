import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';
import { PatientInfo } from './components/PatientInfo';
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
 