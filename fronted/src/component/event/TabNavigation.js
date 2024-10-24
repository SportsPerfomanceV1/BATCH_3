import React, { useState } from 'react';
import EventList from './EventList';
import AppliedEvents from './AppliedEvents';

const TabNavigation = ({ events }) => {
  const [activeTab, setActiveTab] = useState('available');

  // Applied events are filtered based on their status
  const appliedEvents = events.filter((event) => event.status !== 'available');

  return (
    <div className="tab-navigation">
        <br/>

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
        <EventList events={events} />
      ) : (
        <AppliedEvents appliedEvents={appliedEvents} />
      )}
    </div>
  );
};

export default TabNavigation;
