import React, { useState } from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../data/GlobalData"; 
import { Button, Form, Image, Stack } from "react-bootstrap";
import axios from "axios";

function SellerRegistration() {
  const { user } = useGlobalData(); // Access the global user data
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

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Generate a temporary URL for preview
      setFormData({ ...formData, image: file, preview: previewUrl }); // Store the file and preview URL
    }
  };

  const deleteImage = () => {
    setFormData({ ...formData, image: null, preview: null }); // Clear both the file and preview
  };

  const submitForm = async (e) => {
    e.preventDefault();
  
    if (!formData.type || !formData.image) {
      alert("Please fill in all required fields.");
      return;
    }
  
    try {
      // Prepare the FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("user_id", user.user_id); // Add user_id
      formDataToSend.append("identification_type", formData.type); // Add identification type
      formDataToSend.append("image", formData.image); // Add the file directly
  
      // Send the POST request to the backend for business requirements
      const businessResponse = await axios.post(
        "http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/api/business-requirements",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the correct content type
          },
        }
      );
  
      if (businessResponse.status === 201) {
        // If business requirements are successfully submitted, update the user's role
        const roleResponse = await axios.post(
          "http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/api/updateRole",
          {
            user_id: user.user_id,
            role: "seller",
          }
        );
  
        if (roleResponse.status === 200) {
          alert("Congratulations! You are now a seller.");
          navigate("/"); // Redirect to the home page or another page
        } else {
          alert("Failed to update user role.");
        }
      } else {
        alert("Failed to submit business requirements.");
      }
    } catch (error) {
      console.error("Error submitting business requirements or updating role:", error);
      alert("An error occurred while processing your request.");
    }
  };

  const logout = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar />
      </div>
      {user?.role === "seller" ? (
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
                  -- Choose ID --
                </option>
                <option value="National ID">National ID</option>
                <option value="Driver's License">Driver's License</option>
                <option value="Passport">Passport</option>
                <option value="Postal ID">Postal ID</option>
                <option value="School ID">School ID</option>
              </Form.Select>
            </Form.Group>

            {formData.preview ? (
              <Stack className="justify-content-center" gap={3} direction="horizontal">
                <Image
                  src={formData.preview} // Use the preview URL for rendering
                  rounded
                  style={{ maxWidth: "300px", maxHeight: "300px" }}
                />
                <Button variant="danger" onClick={deleteImage}>
                  Delete
                </Button>
              </Stack>
            ) : (
              <Form.Group className="mb-3" controlId="formImage">
                <Form.Label style={{ color: "#8B4512" }}>ID Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  name="image"
                  placeholder="Upload Your ID"
                  onChange={handleImageChange}
                  required
                />
              </Form.Group>
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
