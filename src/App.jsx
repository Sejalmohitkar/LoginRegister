import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Admin/Login';
import Register from './Pages/Admin/Register';
import Sidebar from './Pages/Sidebar/Sidebar';
import DoctorLogin from './Pages/doctorConsultant/DoctorLogin';
import DoctorRegister from './Pages/doctorConsultant/DoctorRegister';
import Dashboard from './Pages/Sidebar/Dashboard';
import Patients from './Pages/Sidebar/Patients';
import Receptionists from './Pages/Sidebar/Receptionists';
import Departments from './Pages/Sidebar/Departments';
import Appointments from './Pages/Sidebar/Appointments';
import PatientDetail from './Pages/Sidebar/PatientDetail';
import NotFound from './Pages/Sidebar/NotFound';

function App() {
  
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Sidebar/>} />
        <Route path="/doctor/login" element={<DoctorLogin/>} />
        <Route path="/doctor/register" element={<DoctorRegister/>} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/patient' element={<Patients/>}/>
        <Route path='/receptionists' element={<Receptionists/>}/>
        <Route path='/appointments' element={<Appointments/>}/>
        <Route path='/patientdetail' element={<PatientDetail/>}/>
        <Route path='/department' element={<Departments/>}/>
        <Route path='/notfound' element={<NotFound/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App;
