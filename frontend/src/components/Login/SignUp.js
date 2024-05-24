import React, { useState } from 'react';
import { Container, Form, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';
import axios from 'axios';

function SignUp() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const payload = {
            email_address: email,
            user_name: username,
            password: password
        };

        try {
            const response = await axios.post('http://localhost:4000/user/register',payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = response.data;

            if (response.ok) {
                alert('User registered successfully');
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error registering user');
        }
    };

    return (
        <Container className="sign-container">
            <h1>Sign Up</h1>
            <Form onSubmit={handleRegister}>
            <Form.Group className="form-group" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="WebApp@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="WebApp_GroupJ"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="webapp2024"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="form-group" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="retype webapp2024"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" className="btn submit-btn">Sign Up</Button>
                <p className="sign-switch">
                    Already registered? <a href="/login">login</a>
                </p>
            </Form>
        </Container>
    );
}

export default SignUp;
