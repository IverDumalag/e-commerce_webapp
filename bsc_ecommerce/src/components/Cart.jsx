import NavBar from './NavBar.jsx';
import { useLocation } from 'react-router-dom';

export default function Cart({ cartItems }) {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const total = cartItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  return (
    <div style={{ width: '100%', minHeight:'100vh',backgroundColor: '#DEB887', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{display:'inline-block', width:'100%'}}> 
      <NavBar username={username} />
      </div>
      <div style={{ margin: '20px auto', padding: '25px', backgroundColor: '#f5f5dc', borderRadius: '10px', border: '2px solid #a0522d', maxWidth: '800px' }}>
        <h2 style={{ color: '#5c4033', marginBottom: '20px' }}>Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p style={{ color: '#5c4033', textAlign: 'center', padding: '20px' }}>
            Your cart is empty
          </p>
        ) : (
          <>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
              <thead>
                <tr>
                  <th style={{ backgroundColor: '#a0522d', color: '#fff', padding: '15px', textAlign: 'left', borderBottom: '3px solid #8b4513' }}>Product</th>
                  <th style={{ backgroundColor: '#a0522d', color: '#fff', padding: '15px', textAlign: 'left', borderBottom: '3px solid #8b4513' }}>Price</th>
                  <th style={{ backgroundColor: '#a0522d', color: '#fff', padding: '15px', textAlign: 'left', borderBottom: '3px solid #8b4513' }}>Quantity</th>
                  <th style={{ backgroundColor: '#a0522d', color: '#fff', padding: '15px', textAlign: 'left', borderBottom: '3px solid #8b4513' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td style={{ padding: '15px', borderBottom: '1px solid #d2b48c', color: '#5c4033' }}>{item.product_name}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #d2b48c', color: '#5c4033' }}>₱{item.product_price}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #d2b48c', color: '#5c4033' }}>{item.quantity}</td>
                    <td style={{ padding: '15px', borderBottom: '1px solid #d2b48c', color: '#5c4033' }}>₱{item.product_price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ textAlign: 'right', fontSize: '1.2em', fontWeight: 'bold', color: '#5c4033', marginTop: '20px' }}>
              Grand Total: ₱{total}
            </div>
          </>
        )}
      </div>
    </div>
  );
}