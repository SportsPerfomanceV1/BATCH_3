import React, { useState } from 'react';
import './CreateMeet.css'; // Import your CSS file here

const CreateMeet = () => {
    const [formData, setFormData] = useState({
        meetName: '',
        date: '',
        location: '',
        description: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform submit actions, like API call
        alert("Meet created successfully!");
    };

    return (
        <div className="create-meet-container">
            <h2>Create Meet</h2>
            <form onSubmit={handleSubmit} className="create-meet-form">
                <div className="form-group">
                    <label htmlFor="meetName">Meet Name</label>
                    <input
                        type="text"
                        id="meetName"
                        name="meetName"
                        value={formData.meetName}
                        onChange={handleChange}
                        required
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Create Meet</button>
            </form>
        </div>
    );
};

export default CreateMeet;
