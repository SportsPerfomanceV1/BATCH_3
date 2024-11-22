import React, { useState } from 'react';
import axios from 'axios';
import './EventForm.css';

const CreateEvent = ({ onEventRegistered }) => {
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    eventDate: '',
    eventTime: '',
    eventDescription: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({
      ...eventDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/event/register', eventDetails);
      alert('Event registered successfully!');
      setEventDetails({
        eventName: '',
        eventDate: '',
        eventTime: '',
        eventDescription: '',
      });
      onEventRegistered(response.data); 
    } catch (error) {
      console.error('Error registering event:', error);
      alert('Successfully Registered Event.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="event-form-container">
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

        <button type="submit" className="submit-btn" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
