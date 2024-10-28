import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleSignup = (e) => {
        e.preventDefault();
       
        navigate('/admin/dashboard'); 
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSignup} className="auth-form">
                <h2>Admin Signup</h2>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default AdminSignup;
