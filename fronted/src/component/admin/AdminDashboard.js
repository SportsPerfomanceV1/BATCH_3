import React, { useState, useEffect } from 'react'; // Import useState
import { Link, Route, Routes } from 'react-router-dom';
import './AdminDashboard.css';
import axios from 'axios';
import CoachRegistrationForm from './RegisterCoach.js';

const AdminDashboard = () => {
    const [showRegistrationForm, setShowRegistrationForm] = useState(false);
    const [createdMeets, setCreatedMeets] = useState([]);

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    // Fetch created meets from the backend
    const fetchCreatedMeets = async () => {
        try {
            const authHeader = getAuthHeader();
            const response = await axios.get('http://localhost:8080/meet/getAll', authHeader);
            setCreatedMeets(response.data);
        } catch (error) {
            console.error('Error fetching created meets:', error);
        }
    };

    useEffect(() => {
        fetchCreatedMeets();
    }, []);

    return (
        <div className="admin-dashboard">
            <header className="navbar1">
                <h1 className="logo1">Athletics</h1>
                <nav>
                    <ul className="navbar-links1">
                        <li><Link to="/news">News</Link></li>
                        <li><Link to="/event">Events</Link></li>
                        <li><Link to="/publish">Results</Link></li>
                        <li><Link to="/coaches">Coaches</Link></li>
                        <li><Link to="/athelete">Athletes</Link></li>
                        <li><Link to="/dashboard">Profile</Link></li>
                        <li><Link to="/home">Logout</Link></li>
                    </ul>
                </nav>
            </header>

            <div className="dashboard-content">
                {showRegistrationForm ? (
                    <CoachRegistrationForm onClose={() => setShowRegistrationForm(false)} />
                ) : (
                    <>
                        <h2>Admin Dashboard</h2>
                        <div className="button-group">
                            <Link to="/createevent">
                                <button className="action-button">Create Event</button>
                            </Link>
                            <Link to="/createmeet">
                                <button className="action-button">Create Meet</button>
                            </Link>
                            <Link>
                            <button className="action-button" onClick={() => setShowRegistrationForm(true)}>Register Coach</button>
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
                                    {createdMeets.map(meet => (
                                        <tr key={meet.meetId}>
                                            <td>{`M000${meet.meetId}`}</td>
                                            <td>{meet.meetName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
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
                <Route path="/register-coach" element={<h2>Register Coach Page</h2>} />
                <Route path="/publish-results" element={<h2>Publish Results Page</h2>} />
            </Routes>
        </div>
    );
};

export default AdminDashboard;
