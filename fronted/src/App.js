import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Dashboard from './component/dashboard/Dashboard';
import News from './component/news/News';
import Coaches from './component/coaches/Coaches';
import Athelete from './component/athelete/Athelete';
import Result from './component/result/Result';
import Navbar from './component/navbar/Navbar'; 
import Login from './component/login/Login';
import Register from './component/register/Register';

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
              <Route path="/event" element={<TabNavigation events={eventsData} />} />
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/athelete" element={<Athelete />} />
              <Route path="/result" element={<Result />} />
              <Route path="/login" element={<Login />} /> 
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

