import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const result = await response.json();
      console.log('Login successful:', result);

      navigate('/home'); 

    } catch (error) {
      setErrorMessage(error.message);
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
            type={showPassword ? "text" : "password"} 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            required 
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="button" className="toggle-btn" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button type="submit" className="submit-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
