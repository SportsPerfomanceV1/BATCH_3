import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/auth/login', data);
      console.log('Login successful', response.data);
      navigate('/home');
    } catch (error) {
      if (error.response) {
     
        setErrorMessage(error.response.data || 'Login failed');
      } else if (error.request) {
     
        setErrorMessage('No response from server');
      } else {
  
        setErrorMessage(error.message);
      }
    }
  };

  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          required 
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            required 
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
