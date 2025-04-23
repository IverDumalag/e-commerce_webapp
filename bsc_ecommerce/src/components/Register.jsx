import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AccountList from '../data/AccountList.jsx';
import BG_LandingPage from '../assets/bg_landingpage.jpeg';

export default function Register() {
   const styles = {
      register_container: {
         height: '100vh',
         backgroundColor: '#DEB887',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
      },
      register_box: {
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
      success: {
         color: 'green',
         marginTop: '10px',
      },
      error: {
         color: 'red',
         marginTop: '10px',
      },
      link: {
         marginTop: '10px',
         color: '#8B4512',
         textDecoration: 'underline',
         cursor: 'pointer',
      },
      bg: {
         backgroundImage: `url(${BG_LandingPage})`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         width: '1700px',
         height: '700px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         margin: '0px 0px 0px 0px',
      },
   };

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);

   const handleRegister = () => {
      const isEmpty = email.trim() === '' || password.trim() === '';
      const isValidEmail = email.endsWith('@gmail.com');
      if (isEmpty) {
         setMessage('Fill the necessary fields');
         setIsSuccess(false);
         return;
      }

      if (!isValidEmail) {
         setMessage('Invalid email format. Please use a Gmail address.');
         setIsSuccess(false);
         return;
      }

      if (AccountList.isDuplicateAccount(email)) {
         setMessage('Email is already registered');
         setIsSuccess(false);
         return;
      }

      AccountList.addAccount(email, password);
      setMessage('Registration successful for ' + email);
      setIsSuccess(true);
   };

   return (
      <div className="register_container" style={styles.register_container}>
         <div className="bg" style={styles.bg}>
            <div className="register_box" style={styles.register_box}>
               <h1 style={{ color: '#8B4512' }}>Register</h1>
               <Form>
                  <Form.Group className="mb-3" controlId="formEmail">
                     <Form.Label style={{ color: '#8B4512' }}>Email</Form.Label>
                     <Form.Control
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                  <Button style={styles.button} onClick={handleRegister}>
                     Register
                  </Button>
                  {message && (
                     <p style={isSuccess ? styles.success : styles.error}>{message}</p>
                  )}
                  <br />
                  <Link to="/login" style={styles.link}>
                     Already have an account? Login here
                  </Link>
               </Form>
            </div>
         </div>
      </div>
   );
}