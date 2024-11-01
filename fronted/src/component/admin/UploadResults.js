import React, { useState } from 'react';

const UploadResults = () => {
    const [results, setResults] = useState('');

    const handleUploadResults = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Upload Results</h2>
            <form onSubmit={handleUploadResults}>
                <textarea 
                    placeholder="Results" 
                    value={results} 
                    onChange={(e) => setResults(e.target.value)} 
                    required 
                />
                <button type="submit">Upload Results</button>
            </form>
        </div>
    );
};

export default UploadResults;
