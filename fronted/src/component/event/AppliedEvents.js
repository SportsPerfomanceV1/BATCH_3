import React from 'react';
import { Link } from 'react-router-dom';

const AppliedEvents = ({ appliedEvents }) => {
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
    <div className="applied-events">
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
        {appliedEvents
            .filter((event) => event.isRegistered) // Filter events where isRegistered is true
            .map((event) => (
            <tr key={event.id}>
                <td>{event.id}</td>
                <td>{event.name}</td>
                <td>{event.category}</td>
                <td>{event.status}</td>
            </tr>
            ))}
        </tbody>

      </table>
    </div>
    </div>
  );
};

export default AppliedEvents;
