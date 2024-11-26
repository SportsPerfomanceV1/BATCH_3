
import React, { useState } from 'react';
import './EventResults.css';

const eventResults = [
  { id: 'E_00001', title: 'Rapid Dash', meetName: 'Victory Sprint Classic' },
  { id: 'E_00002', title: 'Golden Mile Run', meetName: 'Grand Marathon Challenge' },
  { id: 'E_00003', title: 'SprintMaster 100m Dash', meetName: 'Victory Sprint Classic' },
  { id: 'E_00004', title: 'VaultKing Pole Vault', meetName: 'Lightning Bolt Championships' },
  { id: 'E_00005', title: 'LeapPro Long Jump', meetName: 'Lightning Bolt Championships' },
  { id: 'E_00006', title: 'RelayChamp 4x100m', meetName: 'Grand Marathon Challenge' },
  { id: 'E_00007', title: 'DiscusForce Throw', meetName: 'Lightning Bolt Championships' },
  { id: 'E_00008', title: 'ShotPut Titan', meetName: 'Lightning Bolt Championships' },
  { id: 'E_00009', title: 'SpeedBurst 200m Sprint', meetName: 'Grand Marathon Challenge' },
  
];

const EventResults = () => {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredResults = eventResults.filter(
    (event) =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.meetName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublish = (id) => {
    alert(`Publishing result for event ID: ${id}`);
  };

  return (
    <div className="event-results">
      <header>
        <nav>
            <div className='a'><h4>Athletics</h4></div>
          <a href="#events">Events</a>
          <a href="#results">Results</a>
          <a href="#coaches">Coaches</a>
          <a href="#athletes">Athletes</a>
          <a href="#profile" className="profile-icon">Profile</a>
          <a href="#logout" className="logout-icon">Logout</a>
        </nav>
      </header>

      <h1>Event Results</h1>
       <input
        type="text"
        placeholder="Search by meet name or event title"
        value={search}
        onChange={handleSearchChange}
      />

      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Title</th>
            <th>Meet Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.meetName}</td>
              <td>
                <button onClick={() => handlePublish(event.id)} className="publish-button">
                  Publish Result
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventResults;