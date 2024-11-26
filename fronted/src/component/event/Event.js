import React from 'react';
import './Event.css';
import { Link } from 'react-router-dom';
const Event = ({ event, onRegister }) => {
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
    <div className="event-card">
      <div className="event-image-container">
        <img src={event.image} alt={event.name} className="event-image" />
      </div>
      <div className="event-details">
        <h3>{event.name}</h3>
        <p>Date: {event.date}</p>
        <p>Meet: {event.meet}</p>
        <p>Category: {event.category}</p>
      </div>
      <div>
        {event.isRegistered ? (
          <button className="button-registered" disabled>
            Registered
          </button>
        ) : (
          <button
            className="button-19"
            onClick={() => onRegister(event.id)} 
          >
            Register
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default Event;
