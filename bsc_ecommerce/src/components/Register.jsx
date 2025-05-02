import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BG_LandingPage from "../assets/bg_landingpage.jpeg";

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

  const [formData, setFormData] = useState({
    username: "",
    email_address: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    address: "",
    contact_number: "",
    role: "buyer", // Default role
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    // Concatenate first_name, middle_name, and last_name into full_name
    const full_name = `${formData.first_name} ${formData.middle_name} ${formData.last_name}`.trim();

    try {
      console.log("Submitting form data:", { ...formData, full_name });
      const response = await fetch(
        "http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/api/register",
        {
          method: "POST",
          headers: {
        "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, full_name }),
        }
      );
      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        setMessage("Registration successful! You can now log in.");
        setIsSuccess(true);
        setErrors({});
        setTimeout(() => navigate("/login"), 2000); // Redirect to login after 2 seconds
      } else {
        const errorData = await response.json();
        setMessage("Registration failed. Please check the errors below.");
        setErrors(errorData.errors || {});
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      setIsSuccess(false);
    }
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
                name="username"
                placeholder="Enter Your Username"
                onChange={handleInputChange}
                required
              />
              {errors.username && <p style={styles.error}>{errors.username[0]}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label style={{ color: "#8B4512" }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email_address"
                placeholder="Enter Your Email"
                onChange={handleInputChange}
                required
              />
              {errors.email_address && <p style={styles.error}>{errors.email_address[0]}</p>}
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formFirstName">
                  <Form.Label style={{ color: "#8B4512" }}>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.first_name && <p style={styles.error}>{errors.first_name[0]}</p>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formMiddleName">
                  <Form.Label style={{ color: "#8B4512" }}>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middle_name"
                    placeholder="Middle Name"
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formLastName">
                  <Form.Label style={{ color: "#8B4512" }}>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.last_name && <p style={styles.error}>{errors.last_name[0]}</p>}
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label style={{ color: "#8B4512" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleInputChange}
                    required
                  />
                  {errors.password && <p style={styles.error}>{errors.password[0]}</p>}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="formPasswordConfirmation">
                  <Form.Label style={{ color: "#8B4512" }}>
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label style={{ color: "#8B4512" }}>Address</Form.Label>
              <Form.Control
                as="textarea"
                name="address"
                placeholder="Enter Your Address"
                onChange={handleInputChange}
                rows={3}
                required
              />
              {errors.address && <p style={styles.error}>{errors.address[0]}</p>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formContactNumber">
              <Form.Label style={{ color: "#8B4512" }}>
                Contact Number
              </Form.Label>
              <Form.Control
                type="tel"
                name="contact_number"
                placeholder="Enter Your Contact Number"
                onChange={handleInputChange}
                required
              />
              {errors.contact_number && <p style={styles.error}>{errors.contact_number[0]}</p>}
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