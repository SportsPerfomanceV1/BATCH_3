import React from 'react';
import Event from './Event';

const EventList = ({ events, onRegister }) => {
  return (
    <div className="event-list">
      {events.map((event) => (
        <Event key={event.id} event={event} onRegister={onRegister} /> // Pass onRegister to each Event
      ))}
    </div>
  );
};

export default EventList;
