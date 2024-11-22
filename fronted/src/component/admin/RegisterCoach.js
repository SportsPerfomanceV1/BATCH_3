import React, { useState } from 'react';
import './RegisterCoach.css';

const RegisterCoach = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        sport: '',
        experience: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, e.g., send data to the server
        console.log('Registering Coach:', formData);
        setSuccessMessage('Coach registered successfully!');
        // Reset form
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            sport: '',
            experience: '',
        });
    };

    return (
        <div className="register-coach-container">
            <h2>Register Coach</h2>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="register-coach-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formData.lastName} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="sport">Sport:</label>
                    <input 
                        type="text" 
                        id="sport" 
                        name="sport" 
                        value={formData.sport} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                
                <div className="form-group">
                    <label htmlFor="experience">Years of Experience:</label>
                    <input 
                        type="number" 
                        id="experience" 
                        name="experience" 
                        value={formData.experience} 
                        onChange={handleChange} 
                        min="0"
                        required 
                    />
                </div>
                
                <button type="submit" className="submit-button">Register Coach</button>
            </form>
        </div>
    );
};

export default RegisterCoach;
