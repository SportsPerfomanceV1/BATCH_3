import React from 'react';

const AppliedEvents = ({ appliedEvents }) => {
  return (
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
  );
};

export default AppliedEvents;
