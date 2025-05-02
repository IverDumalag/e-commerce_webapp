import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../data/GlobalData';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import BG_LandingPage from '../assets/bg_landingpage.jpeg';

export default function Login() {
  const styles = {
    login_container: {
      height: '100vh',
      backgroundColor: '#DEB887',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    login_box: {
      backgroundColor: '#FFF8DC',
      padding: '50px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      width: '600px',
      textAlign: 'center',
      border: '2px solid #8B4512',
    },
    button: {
      backgroundColor: '#8B4512',
      borderColor: '#8B4512',
      color: '#fff',
      marginTop: '10px',
      borderRadius: '5px',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    registerLink: {
      marginTop: '10px',
      color: '#8B4512',
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useGlobalData(); // Access global state
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Fill the necessary fields');
      return;
    }

    try {
      const response = await fetch('http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.user)
        setUser(data.user); // Store user data in GlobalData
        navigate('/home', { state: { username: data.user.username } });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login_container" style={styles.login_container}>
      <div className="login_box" style={styles.login_box}>
        <h1 style={{ color: '#8B4512' }}>Login</h1>
        <Form>
          <Form.Group className="mb-3" controlId="formUsername">
            <Form.Label style={{ color: '#8B4512' }}>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label style={{ color: '#8B4512' }}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button style={styles.button} onClick={handleLogin}>
            Login
          </Button>
          <br />
          {error && <p style={styles.error}>{error}</p>}
          <p style={styles.registerLink} onClick={handleRegisterRedirect}>
            Don't have an account? Register here.
          </p>
        </Form>
      </div>
    </div>
  );
}