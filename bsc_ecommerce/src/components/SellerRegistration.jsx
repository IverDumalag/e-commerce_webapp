import React from "react";
import NavBar from "./NavBar";
import { useLocation } from "react-router-dom";
import AccountList from "../data/AccountList";

function SellerRegistration() {
  const styles = {
    container: {
      backgroundColor: "#DEB887",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      width: "100%",
      minHeight: "100vh",
    },
    form_box: {
      backgroundColor: "#FFF8DC",
      padding: "50px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "600px",
      textAlign: "center",
      border: "2px solid #8B4512",
      margin: "10px",
    },
    input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #8B4512",
    },
    button: {
      backgroundColor: "#8B4512",
      borderColor: "#8B4512",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    },
    success: {
      color: "green",
      marginTop: "10px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
  };

  const location = useLocation();
  const username = location.state?.username || "Guest";

  const loggedInAccount = AccountList.getAccountLoggedIn();
  const userRole = loggedInAccount.role;

  return (
    <div style={styles.container}>
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar username={username} role={userRole} />
      </div>
      Seller registration
    </div>
  );
}

export default SellerRegistration;
