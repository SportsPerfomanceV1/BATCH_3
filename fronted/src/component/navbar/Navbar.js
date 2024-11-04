import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const handleUserSelection = (event) => {
        const selectedOption = event.target.value;
        setIsAdmin(selectedOption === 'admin');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Atheletic</h1>
                {/* <select className="user-admin-select" onChange={handleUserSelection}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select> */}
            </div>
            <ul className="nav-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/home">About Us</Link></li>
                {isAdmin ? (
                    <li><Link to="/admin/adminlogin" className="button">Admin Login</Link></li>
                ) : (
                    <>
                        <li><Link to="/login" className="button">Login</Link></li>
                        <li><Link to="/register" className="button">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
