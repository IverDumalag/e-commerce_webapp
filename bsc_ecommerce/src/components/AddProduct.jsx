import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../data/ProductList';
import NavBar from './NavBar.jsx';
import { useLocation } from 'react-router-dom';
import AccountList from '../data/AccountList.jsx';

export default function AddProduct() {
   const styles = {
      container: {
         backgroundColor: '#DEB887',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         padding: '20px',
         width: '100%', 
         minHeight: '100vh',
      },
      form_box: {
         backgroundColor: '#FFF8DC',
         padding: '50px',
         borderRadius: '10px',
         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
         width: '600px',
         textAlign: 'center',
         border: '2px solid #8B4512',
         margin: '10px',
      },
      input: {
         width: '100%',
         padding: '10px',
         margin: '10px 0',
         borderRadius: '5px',
         border: '1px solid #8B4512',
      },
      button: {
         backgroundColor: '#8B4512',
         borderColor: '#8B4512',
         color: '#fff',
         padding: '10px 20px',
         borderRadius: '5px',
         cursor: 'pointer',
         marginTop: '10px',
      },
      success: {
         color: 'green',
         marginTop: '10px',
      },
      error: {
         color: 'red',
         marginTop: '10px',
      },
   };

   const [productName, setProductName] = useState('');
   const [productPrice, setProductPrice] = useState('');
   const [productImage, setProductImage] = useState('');
   const [message, setMessage] = useState('');
   const [isSuccess, setIsSuccess] = useState(false);
   const navigate = useNavigate();

   const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            setProductImage(reader.result);
         };
         reader.readAsDataURL(file);
      }
   };

   const handleAddProduct = () => {
      if (!productName || !productPrice || !productImage) {
         setMessage('All fields are required');
         setIsSuccess(false);
         return;
      }

      if (isNaN(productPrice) || productPrice <= 0) {
         setMessage('Price must be a positive number');
         setIsSuccess(false);
         return;
      }

      const newProduct = {
         id: ProductList.length,
         product_name: productName,
         product_price: parseFloat(productPrice),
         product_image: productImage,
      };

      ProductList.push(newProduct);
      setMessage('Product added successfully!');
      setIsSuccess(true);

      setProductName('');
      setProductPrice('');
      setProductImage('');

      setTimeout(() => navigate('/home'), 2000);
   };

   const location = useLocation();
   const username = location.state?.username || 'Guest';

   const loggedInAccount = AccountList.getAccountLoggedIn();
   const userRole = loggedInAccount.role;

   return (
      <div style={styles.container}>
         <div style={{ display: 'inline-block', width: '100%' }}>
         <NavBar username={username} role={userRole} />
         </div>
         <div style={styles.form_box}>
            <h1 style={{ color: '#8B4512' }}>Add Product</h1>
            <input
               type="text"
               placeholder="Product Name"
               value={productName}
               onChange={(e) => setProductName(e.target.value)}
               style={styles.input}
            />
            <input
               type="text"
               placeholder="Product Price"
               value={productPrice}
               onChange={(e) => setProductPrice(e.target.value)}
               style={styles.input}
            />
            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               style={styles.input}
            />
            <button style={styles.button} onClick={handleAddProduct}>
               Add Product
            </button>
            {message && (
               <p style={isSuccess ? styles.success : styles.error}>{message}</p>
            )}
         </div>
      </div>
   );
}