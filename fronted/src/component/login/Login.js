import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [message, setMessage] = useState(''); 
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');

      const response = await axios.post('http://localhost:8080/auth/login',formData);

      const { role } = response.data; 
      
      setMessage("Login successful"); 

     
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'athlete') {
        navigate('/athlete');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || 'Login failed. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>
        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          placeholder="Enter your email" 
          required 
          className="form-input"
          value={formData.email}
          onChange={handleChange} 
        />
        
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input 
            type={showPassword ? "text" : "password"}
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            required 
            className="form-input"
            value={formData.password}
            onChange={handleChange} 
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password-btn"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
