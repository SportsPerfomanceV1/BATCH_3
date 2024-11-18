import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateMeet.css';

const CreateMeet = () => {
    const [formData, setFormData] = useState({
        meetName: '',
        date: '',
        location: '',
        description: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [createdMeets, setCreatedMeets] = useState([]);

    // Fetch created meets from the backend
    const fetchCreatedMeets = async () => {
        try {
            const response = await axios.get('http://localhost:8080/meet/getAll');
            setCreatedMeets(response.data);
        } catch (error) {
            console.error('Error fetching created meets:', error);
        }
    };

    useEffect(() => {
        fetchCreatedMeets();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                'http://localhost:8080/meet/create/admin',
                formData
            );
            setSuccess('Meet created successfully!');
            setFormData({
                meetName: '',
                date: '',
                location: '',
                description: '',
            });
           
            fetchCreatedMeets();
        } catch (error) {
            setError('Failed to create the meet. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-meet-container">
            <h2>Create Meet</h2>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
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

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Meet'}
                </button>
            </form>

            <h3>Created Meets</h3>
            <div className="created-meets-list">
                {createdMeets.length > 0 ? (
                    createdMeets.map((meet) => (
                        <div key={meet.id} className="meet-card">
                            <h4>{meet.meetName}</h4>
                            <p><strong>Date:</strong> {meet.date}</p>
                            <p><strong>Location:</strong> {meet.location}</p>
                            <p><strong>Description:</strong> {meet.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No meets created yet.</p>
                )}
            </div>
        </div>
    );
};

export default CreateMeet;
