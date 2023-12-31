import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './Auth.js';
import './Login.css';


const LoginForm = () => {
    const navigate = useNavigate();
    const { setLoggedIn, setUsername } = useContext(AuthContext);
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: inputUsername, password}),
            });
            if (response.ok) {
                console.log('Login Success');
                setLoggedIn(true);
                setUsername(inputUsername);
                navigate('/inventory');
            } else {
                console.error('Login Failed');
                setLoggedIn(false);
            }    
        } catch (error) {
                console.error('Error during login:', error);
        }
    };

    return (
    <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username:</label>
        <input
            type="username"
            id="username"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            required
        />
        <label htmlFor="password">Password:</label>
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
        />

        <button type="submit">Login</button>
    </form>

    );
};

export default LoginForm;
