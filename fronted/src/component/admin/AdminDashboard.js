import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    
    return (
        <div className="admin-dashboard">
            <header className="navbar1">
                <h1 className="logo1">Athletics</h1>
                <nav>
                    <ul className="navbar-links1">
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/event">Events</Link></li>
                        <li><Link to="/result">Results</Link></li>
                        <li><Link to="/coaches">Coaches</Link></li>
                        <li><Link to="/athelete">Athletes</Link></li>
                        <li><Link to="/athelete">Profile</Link></li>
                        <li><Link to="/home">Logout</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="dashboard-content">
                <h2>Admin Dashboard</h2>
                
                <div className="button-group">
                    <Link to="/createevent">
                        <button className="action-button">Create Event</button>
                    </Link>
                    <Link to="/createmeet">
                        <button className="action-button">Create Meet</button>
                    </Link>
                    <Link to="/uploadresults">
                        <button className="action-button">Shortlist Candidates</button>
                    </Link>
                    <Link to="/result">
                        <button className="action-button">Publish Results</button>
                    </Link>
                </div>
                
                <div className="created-meets">
                    <h3>Created Meets</h3>
                    <table className="meets-table">
                        <thead>
                            <tr>
                                <th>MEET ID</th>
                                <th>MEET NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>M_00001</td>
                                <td>Victory Sprint Classic</td>
                            </tr>
                            <tr>
                                <td>M_00002</td>
                                <td>Grand Marathon Challenge</td>
                            </tr>
                            <tr>
                                <td>M_00003</td>
                                <td>Lightning Bolt Championships</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           
            <Routes>
                <Route path="/news" element={<h2>News Page</h2>} />
                <Route path="/events" element={<h2>Events Page</h2>} />
                <Route path="/results" element={<h2>Results Page</h2>} />
                <Route path="/coaches" element={<h2>Coaches Page</h2>} />
                <Route path="/athletes" element={<h2>Athletes Page</h2>} />
                <Route path="/profile" element={<h2>Profile Page</h2>} />
                <Route path="/logout" element={<h2>Logging out...</h2>} />
                <Route path="/create-event" element={<h2>Create Event Page</h2>} />
                <Route path="/create-meet" element={<h2>Create Meet Page</h2>} />
                <Route path="/shortlist-candidates" element={<h2>Shortlist Candidates Page</h2>} />
                <Route path="/publish-results" element={<h2>Publish Results Page</h2>} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
