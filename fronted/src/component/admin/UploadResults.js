import React, { useState } from 'react';

const UploadResults = () => {
    const [results, setResults] = useState('');

    const handleUploadResults = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Name of Shortlisted Candidates</h2>
            <form onSubmit={handleUploadResults}>
                <textarea 
                    placeholder="Names" 
                    value={results} 
                    onChange={(e) => setResults(e.target.value)} 
                    required 
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadResults;
