import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home/home';
import News from './component/news/News';
import Coaches from './component/coaches/Coaches';
import Athelete from './component/athelete/Athelete';
import Result from './component/result/Result';
import Navbar from './component/navbar/Navbar'; 
import Login from './component/login/Login';
import Register from './component/register/Register';
import TabNavigation from './component/event/TabNavigation';
import { eventsData } from './component/event/data/eventsData'; 
import AddProfileForm from './component/coaches/AddProfileForm';
import AdminDashboard from './component/admin/AdminDashboard';
import CreateMeet from './component/admin/CreateMeet';
import CreateEvent from './component/admin/CreateEvent';
import RegisterCoach from './component/admin/RegisterCoach';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <div className="App-header"> 
          <div className="App-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/news" element={<News />} />
              <Route path="/event" element={<TabNavigation events={eventsData} />} /> {/* Use TabNavigation */}
              <Route path="/coaches" element={<Coaches />} />
              <Route path="/athelete" element={<Athelete />} />
              <Route path="/add-profile" element={<AddProfileForm onAddProfile={() => {}} />} />
               <Route path="/admindashboard" element={<AdminDashboard/>}/>
<Route path="/createmeet" element={<CreateMeet/>}/>
<Route path="/createevent" element={<CreateEvent/>}/>
<Route path="/registercoach" element={<RegisterCoach/>}/>
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
