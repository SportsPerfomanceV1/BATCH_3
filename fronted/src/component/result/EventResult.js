import React from 'react';
import './EventResult.css';

function EventResult({ event, onPublish }) {
    return (
        <tr className="event-result">
            
      <td>{event.id}</td>
      <td>{event.eventTitle}</td>
      <td>{event.meetName}</td>
      <td>{event.status}</td>
   
                <button onClick={() => onPublish(event.id)} className="publish-button">
                    Publish Result
                </button>
           
        </tr>
    );
}

export default EventResult;
