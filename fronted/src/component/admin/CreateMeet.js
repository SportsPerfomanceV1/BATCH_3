import React, { useState } from 'react';

const CreateMeet = () => {
    const [meetName, setMeetName] = useState('');
    const [meetDate, setMeetDate] = useState('');

    const handleCreateMeet = (e) => {
        e.preventDefault();
    
    };

    return (
        <div>
            <h2>Create Meet</h2>
            <form onSubmit={handleCreateMeet}>
                <input 
                    type="text" 
                    placeholder="Meet Name" 
                    value={meetName} 
                    onChange={(e) => setMeetName(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={meetDate} 
                    onChange={(e) => setMeetDate(e.target.value)} 
                    required 
                />
                <button type="submit">Create Meet</button>
            </form>
        </div>
    );
};

export default CreateMeet;
