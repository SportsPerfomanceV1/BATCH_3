import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './component/dashboard/Dashboard';
import News from './component/news/News';
import Event from './component/event/Event';
import Coaches from './component/coaches/Coaches';
import Athelete from './component/athelete/Athelete';
import Result from './component/result/Result';
import Navbar from './component/navbar/Navbar'; 
import Login from './component/login/Login';
import Register from './component/register/Register';
import AdminDashboard from './component/admin/AdminDashboard';
import AdminLogin from './component/admin/AdminLogin';
import AdminNavbar from './component/admin/AdminNavbar';
import AdminSignup from './component/admin/AdminSignup';
import CreateEvent from './component/admin/CreateEvent';
import CreateMeet from './component/admin/CreateMeet';
import UploadResults from './component/admin/UploadResults';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <div className="App-header"> 
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/news" element={<News />} />
              <Route path="/event" element={<Event />} />
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/athelete" element={<Athelete />} />
              <Route path="/result" element={<Result />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
              <Route path="/admin/login" component={AdminLogin} />
                <Route path="/admin/signup" component={AdminSignup} />
                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/admin/dashboard" component={AdminDashboard} />
                <Route path="/admin/create-event" component={CreateEvent} />
                <Route path="/admin/AdminNavbar" component={AdminNavbar} />
                <Route path="/admin/upload-results" component={UploadResults} />
                <Route path="/admin/create-meet" component={CreateMeet} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

