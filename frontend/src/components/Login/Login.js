import React, { useState } from 'react';
import { Container, Form, Button} from "react-bootstrap";
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
            user_password: password,
        };

        try {
            const response = await axios.post('http://localhost:4000/users/login',payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
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
        <Container className="sign-container">
            <h1>Login</h1>
            <Form onSubmit={handleLogin}>
                <Form.Group className="form-group" controlId="username">
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="password">
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="btn submit-btn">
                    Login
                </Button>
                <p className="forgot-password-switch">
                    <a href="/forgot-password">Forgot Password?</a>
                </p>
                <p className="sign-switch">
                    Don't have an account? <a href="/signup">sign up</a>
                </p>
            </Form>
        </Container>
    );
}

export default Login;
