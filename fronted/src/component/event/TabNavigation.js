import React, { useState } from 'react';
import EventList from './EventList';
import AppliedEvents from './AppliedEvents';

const TabNavigation = ({ events }) => {
  const [eventData, setEventData] = useState(events); // Use local state for events
  const [activeTab, setActiveTab] = useState('available');

  const handleRegister = (eventId) => {
    setEventData((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId ? { ...event, isRegistered: true } : event
      )
    );
  };

  const availableEvents = eventData.filter((event) => !event.isRegistered);
  const appliedEvents = eventData.filter((event) => event.isRegistered);

  return (
    <div className="tab-navigation">
      <br />
      <div className="tabs">
        <button
          onClick={() => setActiveTab('available')}
          className={activeTab === 'available' ? 'active' : ''}
        >
          Available Events
        </button>
        <button
          onClick={() => setActiveTab('applied')}
          className={activeTab === 'applied' ? 'active' : ''}
        >
          Applied Events
        </button>
      </div>

      {activeTab === 'available' ? (
        <EventList events={availableEvents} onRegister={handleRegister} /> // Pass handleRegister as onRegister
      ) : (
        <AppliedEvents appliedEvents={appliedEvents} />
      )}
    </div>
  );
};

export default TabNavigation;
