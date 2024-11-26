import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateMeet.css';

const CreateMeet = () => {
    const [formData, setFormData] = useState({
        meetName: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [createdMeets, setCreatedMeets] = useState([]);

    const getAuthHeader = () => {
        const token = localStorage.getItem('authToken');
        return {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
    };

    // Fetch created meets from the backend
    const fetchCreatedMeets = async () => {
        try {
            const authHeader = getAuthHeader();
            const response = await axios.get('http://localhost:8080/meet/getAll', authHeader);
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
            const authHeader = getAuthHeader();
            const response = await axios.post(
                'http://localhost:8080/meet/create/admin',
                formData,
                authHeader
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
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data || 'An error occurred');
            } else if (error.request) {
                console.error('Error request:', error.request);
                setError('No response received from the server');
            } else {
                console.error('Error message:', error.message);
                setError('Error in setting up the request');
            }
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
