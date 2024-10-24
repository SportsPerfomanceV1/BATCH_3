import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>SIGN UP</h2>

        <label htmlFor="name">Name</label>
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
            type={showPassword ? "text" : "password"} 
            id="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
            className="form-input"
          />
          <button type="button" className="toggle-btn" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <label htmlFor="dob">Date of Birth</label>
        <input 
          type="date" 
          id="dob" 
          name="dob" 
          value={formData.dob} 
          onChange={handleChange} 
          required 
          className="form-input"
        />

        <button type="submit" className="submit-btn">Register</button>

        <p className="login-redirect">
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
