import React, { useState } from 'react';
import './Athlete.css';
import { Link } from 'react-router-dom';

const Athlete = () => {
    const [activeTab, setActiveTab] = useState('Overview');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
        <header className="navbar1">
            <h1 className="logo1">Athletics</h1>
            <nav>
                <ul className="navbar-links1">
                    <li><Link to="/news">News</Link></li>
                    <li><Link to="/event">Events</Link></li>
                    <li><Link to="/result">Results</Link></li>
                    <li><Link to="/coaches">Coaches</Link></li>
                    <li><Link to="/athelete">Athletes</Link></li>
                    <li><Link to="/dashboard">Profile</Link></li>
                    <li><Link to="/home">Logout</Link></li>
                </ul>
            </nav>
        </header>
        <div className="athlete-container">
            <div className="athlete-profile">
                <div className="profile-card">
                    <img 
                        src="https://i.pinimg.com/originals/ff/10/7d/ff107dd98f5c0c69990a1ca57a850b9a.jpg" 
                        alt="Profile" 
                        className="profile-image" 
                    />
                    <div className="profile-info">
                        <h2>Damon Salvatore</h2>
                        <p>Date of Birth: 10/10/2000</p>
                        <p>Gender: Male</p>
                        <p>Height: 170 cm</p>
                        <p>Weight: 60 kg</p>
                        <p>Category: 100M</p>
                        <p>Coach: N/A</p>
                    </div>
                    <button className="edit-button">✏️ Edit Profile</button>
                </div>

                <div className="tabs">
                    <div className="tab-links">
                        <button 
                            className={activeTab === 'Overview' ? 'active' : ''}
                            onClick={() => handleTabClick('Overview')}
                        >Overview</button>
                        <button 
                            className={activeTab === 'Applied Events' ? 'active' : ''}
                            onClick={() => handleTabClick('Applied Events')}
                        >Applied Events</button>
                        <button 
                            className={activeTab === 'Wellness' ? 'active' : ''}
                            onClick={() => handleTabClick('Wellness')}
                        >Wellness</button>
                    </div>
                    <div className="tab-content">
                        {activeTab === 'Overview' && (
                            <div className="tab-overview">Overview content here...</div>
                        )}
                        {activeTab === 'Applied Events' && (
                            <div className="tab-applied-events">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Event ID</th>
                                            <th>Event Name</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Wellness' && (
                            <div className="tab-wellness">Wellness content here...</div>
                        )}
                    
                      
                    <div className="filter-buttons">
                        <button 
                            className={activeTab === 'Pending' ? 'active' : ''}
                            onClick={() => handleTabClick('Pending')}
                        >Pending</button>
                        <button 
                            className={activeTab === 'Approved' ? 'active' : ''}
                            onClick={() => handleTabClick('Approved')}
                        >Approved</button>
                        <button 
                            className={activeTab === 'Rejected' ? 'active' : ''}
                            onClick={() => handleTabClick('Rejected')}
                        >Rejected</button>
                    </div>
</div>

                    <div className="tab-content">
                        {activeTab === 'Overview' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Pending' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00007</td><td>DiscusForce Throw</td><td>Throw</td><td>Pending</td></tr>
                                        <tr><td>E_00006</td><td>RelayChamp 4x100m</td><td>4x100m</td><td>Pending</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Approved' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00001</td><td>Rapid Dash</td><td>100M</td><td>Approved</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {activeTab === 'Rejected' && (
                            <div className="tab-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>EVENT ID</th>
                                            <th>EVENT NAME</th>
                                            <th>CATEGORY</th>
                                            <th>STATUS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>E_00004</td><td>VaultKing Pole Vault</td><td>10M</td><td>Rejected</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Athlete;
