import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        const payload = {
            user_name: username,
            password: password,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login',
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = response.data;

            if (response.ok) {
                alert('Login successful');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error login user');
        }
    };

    return (
        <div className="sign-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder=""
                        className="form-control"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder=""
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn submit-btn">Login</button>
                <p className="forgot-password-switch">
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p className="sign-switch">
                    Don't have an account? <a href="/signup">sign up</a>
                </p>

            </form>
        </div>
    );
}

export default Login;
