import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./LandingPage";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";
import AddProduct from "./components/AddProduct";
import SellerRegistration from "./components/SellerRegistration";
import Orders from "./components/Orders";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1, status: "pending" }];
      }
    });
  };

  const updateCartItemStatus = (itemId, newStatus) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={<HomePage cartItems={cartItems} addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              updateCartItemStatus={updateCartItemStatus}
            />
          }
        />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/seller_registration" element={<SellerRegistration />} />
        <Route path="/orders" element={<Orders cartItems={cartItems} />} />
      </Routes>
    </Router>
  );
}

export default App;