import React, { useState } from "react";
import NavBar from "./NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import AccountList from "../data/AccountList";
import { Button, Form, Image, Stack } from "react-bootstrap";

function SellerRegistration() {
  const navigate = useNavigate();
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

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // setProductImage(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setFormData({ ...formData, image: null });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (formData.type == null) {
      alert("please choose a valid id");
      return;
    }

    console.log(formData);
    alert("Congratulations!! You are now a seller!");

    navigate("/");
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar username={username} role={userRole} />
      </div>
      {userRole == "seller" ? (
        <></>
      ) : (
        <div
          style={{
            margin: "20px auto",
            padding: "25px",
            backgroundColor: "#f5f5dc",
            borderRadius: "10px",
            border: "2px solid #a0522d",
            width: "50%",
            maxWidth: "800px",
          }}
        >
          <h2 style={{ color: "#5c4033", marginBottom: "20px" }}>
            Register as Seller
          </h2>

          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formIdType">
              <Form.Label style={{ color: "#8B4512" }}>
                Identification Type
              </Form.Label>

              <Form.Select
                name="type"
                defaultValue=""
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  -- Choose ID--
                </option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Passport">Passport</option>
                <option value="Postal ID">Postal ID</option>
                <option value="School ID">School ID</option>
              </Form.Select>
            </Form.Group>

            {formData.image == null ? (
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label style={{ color: "#8B4512" }}>ID Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Enter Your Username"
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>
            ) : (
              <Stack
                className="justify-content-center"
                gap={3}
                direction="horizontal"
              >
                <Image
                  src={formData.image}
                  rounded
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                ></Image>
                <Button variant="danger" onClick={deleteImage}>
                  Delete
                </Button>
              </Stack>
            )}
            <Button
              style={{
                backgroundColor: "#8B4512",
                borderColor: "#8B4512",
                color: "#fff",
                marginTop: "10px",
                borderRadius: "5px",
              }}
              type="submit"
            >
              Register
            </Button>
          </Form>
        </div>
      )}

      <div
        style={{
          margin: "20px auto",
          padding: "25px",
          backgroundColor: "#f5f5dc",
          borderRadius: "10px",
          border: "2px solid #a0522d",
          width: "50%",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ color: "#5c4033", marginBottom: "20px" }}>Logout</h2>

        <Button variant="danger" onClick={logout}>
          Log out
        </Button>
      </div>
    </div>
  );
}

export default SellerRegistration;
