import { useLocation } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import ProductCard from './ProductCard.jsx';
import ProductList from '../data/ProductList.jsx';

export default function HomePage({ cartItems, addToCart }) {
   const styles = {
      home_container: {
         width: '100%',
         backgroundColor: '#DEB887',
         display: 'flex',
         flexDirection: 'column',
         justifyContent: 'center',
         alignItems: 'center',
         padding: '20px',
      },
   };
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.product_name} has been added to your cart!`);
  };

return (
   <div style={{ width: '100%', backgroundColor: '#DEB887', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ display: 'inline-block', width: '100%' }}> 
         <NavBar username={username} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '80%', marginTop: '20px', justifyContent: 'center' }}>
         {ProductList.map((product) => (
            <ProductCard key={product.id} products={product} addToCart={handleAddToCart} />
         ))}
      </div>
   </div>
);
}