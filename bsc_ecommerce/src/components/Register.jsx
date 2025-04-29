import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AccountList from "../data/AccountList.jsx";
import BG_LandingPage from "../assets/bg_landingpage.jpeg";
import Stack from "react-bootstrap/Stack";

export default function Register() {
  const styles = {
    register_container: {
      height: "100vh",
      backgroundColor: "#DEB887",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    register_box: {
      backgroundColor: "#FFF8DC",
      padding: "50px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      width: "600px",
      textAlign: "center",
      border: "2px solid #8B4512",
    },
    button: {
      backgroundColor: "#8B4512",
      borderColor: "#8B4512",
      color: "#fff",
      marginTop: "10px",
      borderRadius: "5px",
    },
    success: {
      color: "green",
      marginTop: "10px",
    },
    error: {
      color: "red",
      marginTop: "10px",
    },
    link: {
      marginTop: "10px",
      color: "#8B4512",
      textDecoration: "underline",
      cursor: "pointer",
    },
    bg: {
      backgroundImage: `url(${BG_LandingPage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "1700px",
      height: "700px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: "0px 0px 0px 0px",
    },
  };

  const [formData, setFormData] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  const handleRegister = () => {
    const isEmpty = email.trim() === "" || password.trim() === "";
    const isValidEmail = email.endsWith("@gmail.com");
    if (isEmpty) {
      setMessage("Fill the necessary fields");
      setIsSuccess(false);
      return;
    }

    if (!isValidEmail) {
      setMessage("Invalid email format. Please use a Gmail address.");
      setIsSuccess(false);
      return;
    }

    if (AccountList.isDuplicateAccount(email)) {
      setMessage("Email is already registered");
      setIsSuccess(false);
      return;
    }

    AccountList.addAccount(email, password);
    setMessage("Registration successful for " + email);
    setIsSuccess(true);
  };

  return (
    <div className="register_container" style={styles.register_container}>
      <div className="bg" style={styles.bg}>
        <div className="register_box" style={styles.register_box}>
          <h1 style={{ color: "#8B4512" }}>Register</h1>
          <Form onSubmit={submitForm}>
            <Form.Group className="mb-3" controlId="formUname">
              <Form.Label style={{ color: "#8B4512" }}>Username</Form.Label>
              <Form.Control
                type="text"
                name="uname"
                placeholder="Enter Your Username"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: "#8B4512" }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label style={{ color: "#8B4512" }}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Stack
              className="mb-3 justify-content-between"
              gap={4}
              direction="horizontal"
            >
              <Form.Group style={{ width: "100%" }} controlId="formFname">
                <Form.Label style={{ color: "#8B4512" }}>Firstname</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  placeholder="Enter Your Firstname"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group style={{ width: "100%" }} controlId="formMname">
                <Form.Label style={{ color: "#8B4512" }}>Middlename</Form.Label>
                <Form.Control
                  type="text"
                  name="mname"
                  placeholder="Enter Your Middlename"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Stack>

            <Stack
              className="mb-3 justify-content-between"
              gap={4}
              direction="horizontal"
            >
              <Form.Group style={{ width: "100%" }} controlId="formLname">
                <Form.Label style={{ color: "#8B4512" }}>Lastname</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  placeholder="Enter Your Lastname"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
              <Form.Group style={{ width: "100%" }} controlId="formContact">
                <Form.Label style={{ color: "#8B4512" }}>
                  Contact No.
                </Form.Label>
                <Form.Control
                  type="tel"
                  name="contact"
                  placeholder="Enter Your Contact No."
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Stack>

            <Form.Group
              style={{ width: "100%" }}
              className="mb-3"
              controlId="formAddress"
            >
              <Form.Label style={{ color: "#8B4512" }}>Address</Form.Label>
              <Form.Control
                //  type="text"
                as="textarea"
                name="address"
                placeholder="Enter Your Address"
                onChange={handleInputChange}
                rows={4}
                required
              />
            </Form.Group>

            <Button style={styles.button} type="submit">
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
