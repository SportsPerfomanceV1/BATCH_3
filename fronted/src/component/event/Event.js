import React from 'react';
import './Event.css';

const Event = ({ event, onRegister }) => {
  return (
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
  );
};

export default Event;
