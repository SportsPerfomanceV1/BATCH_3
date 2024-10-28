import React, { useState } from 'react';

const CreateEvent = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');

    const handleCreateEvent = (e) => {
        e.preventDefault();
     
    };

    return (
        <div>
            <h2>Create Event</h2>
            <form onSubmit={handleCreateEvent}>
                <input 
                    type="text" 
                    placeholder="Event Name" 
                    value={eventName} 
                    onChange={(e) => setEventName(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={eventDate} 
                    onChange={(e) => setEventDate(e.target.value)} 
                    required 
                />
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
