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
import { GlobalDataProvider } from "./data/GlobalData";
import { createContext } from "react";

export const cartContext = createContext();

function App() {
  const [cartItems, setCartItems] = useState([]);
  const cartVal = { cartItems, setCartItems };

  return (
    <cartContext.Provider value={cartVal}>
      <GlobalDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route
              path="/seller_registration"
              element={<SellerRegistration />}
            />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Router>
      </GlobalDataProvider>
    </cartContext.Provider>
  );
}

export default App;
