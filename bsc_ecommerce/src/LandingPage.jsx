import React from 'react';
import { Button } from 'react-bootstrap';
import BG_LandingPage from './assets/bg_landingpage.jpeg';
import { useNavigate } from 'react-router-dom';

export default function App() {
   const styles = {
      container: {
         height: '100vh',
         backgroundColor: '#DEB887',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
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
      txtBg: {
         backgroundColor: '#DEB887',
         height: '250px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         margin: '10px 0px 100px 0',
         padding: '0 50px 0 50px',
         borderColor: '#8B4512',
         borderWidth: '5px',
         borderRadius: '10px',
         borderStyle: 'solid',
      },
      heading: {
         color: '#fff',
         marginBottom: '10px',
         textAlign: 'center',
      },
      buttonContainer: {
         display: 'flex',
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'center',
      },
      button: {
         margin: '0 10px',
         backgroundColor: '#DEB887',
         borderColor: '#8B4512',
         color: '#fff',
         borderRadius: '10px',
         borderWidth: '5px',
         width: '150px',
      },
   };

   const navigate = useNavigate();

   return (
      <div style={styles.container}>
         <div className="bg" style={styles.bg}>
            <div className="txt_bg" style={styles.txtBg}>
               <h1 style={{ ...styles.heading, fontFamily: "'Pacifico', cursive" }}>KAMI'S YOROKOBI</h1>
               <h1 style={styles.heading}>Discover Nature's Greatest Treat</h1>
            </div>
            <div style={styles.buttonContainer}>
               <Button size="lg" style={styles.button} onClick={() => navigate('/login')}>Login</Button>
               <Button size="lg" style={styles.button} onClick={() => navigate('/register')}>Register</Button>
            </div>
         </div>
      </div>
   );
}
