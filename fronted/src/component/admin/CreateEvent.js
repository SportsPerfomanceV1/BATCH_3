import React, { useState } from 'react';
import './EventForm.css';

const CreateEvent = () => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(eventDetails);
  };

  return (
    <div className="event-form-container">
      <div className="event-form-overlay">
        <form onSubmit={handleSubmit} className="event-form">
          <h2>Create an Event</h2>

          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              value={eventDetails.eventName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDate">Event Date</label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              value={eventDetails.eventDate}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventTime">Event Time</label>
            <input
              type="time"
              id="eventTime"
              name="eventTime"
              value={eventDetails.eventTime}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="eventDescription">Event Description</label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={eventDetails.eventDescription}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Create Event</button>
        </form>
      </div>
    </div>
  );
};



export default CreateEvent;
