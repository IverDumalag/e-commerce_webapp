import NavBar from './NavBar.jsx';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import AccountList from '../data/AccountList.jsx';

export default function Cart({ cartItems }) {
  const location = useLocation();
  const username = location.state?.username || 'Guest';

  const [pendingItems, setPendingItems] = useState(
    cartItems.filter((item) => item.status === 'pending')
  );
  const [confirmedItems, setConfirmedItems] = useState(
    cartItems.filter((item) => item.status === 'confirmed')
  );

  const totalPending = pendingItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const totalConfirmed = confirmedItems.reduce(
    (acc, item) => acc + item.product_price * item.quantity,
    0
  );

  const handleConfirm = (itemId) => {
    const itemToConfirm = pendingItems.find((item) => item.id === itemId);
    if (itemToConfirm) {
      setPendingItems((prev) => prev.filter((item) => item.id !== itemId));
      setConfirmedItems((prev) => [...prev, { ...itemToConfirm, status: 'confirmed' }]);
    }
  };

  const handleCancel = (itemId) => {
    setConfirmedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const loggedInAccount = AccountList.getAccountLoggedIn();
  const userRole = loggedInAccount.role;

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#DEB887',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <div style={{ display: 'inline-block', width: '100%' }}>
      <NavBar username={username} role={userRole} />
      </div>

      {/* Pending Items */}
      <div
        style={{
          margin: '20px auto',
          padding: '25px',
          backgroundColor: '#f5f5dc',
          borderRadius: '10px',
          border: '2px solid #a0522d',
          maxWidth: '800px',
        }}
      >
        <h2 style={{ color: '#5c4033', marginBottom: '20px' }}>
          Pending Purchases
        </h2>
        {pendingItems.length === 0 ? (
          <p
            style={{
              color: '#5c4033',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            No pending purchases
          </p>
        ) : (
          <>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {pendingItems.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      {item.product_name}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      ₱{item.product_price}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      ₱{item.product_price * item.quantity}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: '#a0522d',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 15px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleConfirm(item.id)}
                      >
                        Confirm
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                textAlign: 'right',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: '#5c4033',
                marginTop: '20px',
              }}
            >
              Total Pending: ₱{totalPending}
            </div>
          </>
        )}
      </div>

      {/* Confirmed Items */}
      <div
        style={{
          margin: '20px auto',
          padding: '25px',
          backgroundColor: '#f5f5dc',
          borderRadius: '10px',
          border: '2px solid #a0522d',
          maxWidth: '800px',
        }}
      >
        <h2 style={{ color: '#5c4033', marginBottom: '20px' }}>
          Confirmed Purchases
        </h2>
        {confirmedItems.length === 0 ? (
          <p
            style={{
              color: '#5c4033',
              textAlign: 'center',
              padding: '20px',
            }}
          >
            No confirmed purchases
          </p>
        ) : (
          <>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                margin: '20px 0',
              }}
            >
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Product
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Price
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Quantity
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Total
                  </th>
                  <th
                    style={{
                      backgroundColor: '#a0522d',
                      color: '#fff',
                      padding: '15px',
                      textAlign: 'left',
                      borderBottom: '3px solid #8b4513',
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {confirmedItems.map((item) => (
                  <tr key={item.id}>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      {item.product_name}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      ₱{item.product_price}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      {item.quantity}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      ₱{item.product_price * item.quantity}
                    </td>
                    <td
                      style={{
                        padding: '15px',
                        borderBottom: '1px solid #d2b48c',
                        color: '#5c4033',
                      }}
                    >
                      <button
                        style={{
                          backgroundColor: '#a0522d',
                          color: '#fff',
                          border: 'none',
                          padding: '10px 15px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                        }}
                        onClick={() => handleCancel(item.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              style={{
                textAlign: 'right',
                fontSize: '1.2em',
                fontWeight: 'bold',
                color: '#5c4033',
                marginTop: '20px',
              }}
            >
              Total Confirmed: ₱{totalConfirmed}
            </div>
          </>
        )}
      </div>
    </div>
  );
}