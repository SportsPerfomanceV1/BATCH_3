import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; 

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); 

        navigate('/dashboard'); 
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleLogin}>
                <h2>Admin Login</h2>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;
