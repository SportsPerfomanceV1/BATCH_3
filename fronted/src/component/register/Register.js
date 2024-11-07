import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Register.css';
import axios from 'axios';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/register', formData);

      console.log('Registration successful', response.data);
      navigate('/login');
    } catch (error) {
      if (error.response) {
   
        setErrorMessage(error.response.data || 'Registration failed');
      } else if (error.request) {
     
        setErrorMessage('No response from server');
      } else {
        setErrorMessage(error.message);
      }
    }
  };
  
  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>

        {errorMessage && <div className="error-message">{errorMessage}</div>} 
        
        <label htmlFor="name">Full Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          className="form-input"
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="form-input"
        />

        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
        </div>

       
        <label htmlFor="role">Role</label>
        <select 
          id="role" 
          name="role" 
          value={formData.role} 
          onChange={handleChange} 
          required 
          className="form-input"
        >
          <option value="" disabled>Select your role</option>
          <option value="Coach">Coache</option>
          <option value="Athlete">Athlete</option>
        </select>

        <button type="submit" className="submit-btn">Register</button>

        <p className="login-redirect">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
