import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "../data/ProductList";
import NavBar from "./NavBar.jsx";
import Stack from "react-bootstrap/Stack";
import ProductTable from "./ProductTable.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axiosInstance from "./axios.jsx";

export default function AddProduct() {
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
    modal_header: {
      backgroundColor: "#8B4512",
      color: "#FFF",
      borderBottom: "1px solid #5C4033",
    },
    modal_body: {
      backgroundColor: "#FFF8DC",
      color: "#5C4033",
    },
    modal_footer: {
      backgroundColor: "#FFF8DC",
      borderTop: "1px solid #5C4033",
    },
    modal_input: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      border: "1px solid #8B4512",
      backgroundColor: "#F5F5DC",
      color: "#5C4033",
    },
    modal_button_primary: {
      backgroundColor: "#8B4512",
      borderColor: "#8B4512",
      color: "#FFF",
      padding: "10px 20px",
      borderRadius: "5px",
    },
    modal_button_secondary: {
      backgroundColor: "#D2B48C",
      borderColor: "#8B4512",
      color: "#5C4033",
      padding: "10px 20px",
      borderRadius: "5px",
    },
  };

  const [formData, setFormData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axiosInstance
      .get("category")
      .then((res) => {
        // console.log(res.data.categories);
        // console.log(categories);
        setCategories(res.data.categories);
      })
      .catch((err) => {});
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    const newCategoryObj = {
      id: categories.length + 1,
      name: newCategory,
    };

    setCategories([...categories, newCategoryObj]);
    setNewCategory("");
    setShowModal(false);
    alert("Category added successfully!");
  };

  return (
    <div style={styles.container}>
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar />
      </div>
      <form style={styles.form_box}>
        <h1 style={{ color: "#8B4512" }}>Add Product</h1>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <Stack direction="horizontal" gap={4}>
          <select
            name="category"
            placeholder="Category"
            style={{ ...styles.input, width: "70%" }}
            required
            onChange={handleInputChange}
            defaultValue="0"
          >
            <option value="0" disabled>
              --Category--
            </option>
            {categories.map((category, index) => (
              <option key={index} value={category.category_id}>
                {category.category}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Product Price"
            onChange={handleInputChange}
            style={styles.input}
            required
          />
        </Stack>
        <textarea
          name="desc"
          placeholder="Product Description"
          onChange={handleInputChange}
          style={styles.input}
          rows={4}
          required
        ></textarea>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
          required
        />
        <button style={styles.button} type="submit">
          Add Product
        </button>
        <button
          style={{ ...styles.button, marginLeft: "10px" }}
          type="button"
          onClick={() => setShowModal(true)}
        >
          Add Category
        </button>
      </form>

      {/* Modal for Adding Category */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={styles.modal_header}>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modal_body}>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            style={styles.modal_input}
          />
        </Modal.Body>
        <Modal.Footer style={styles.modal_footer}>
          <Button
            style={styles.modal_button_secondary}
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
          <Button
            style={styles.modal_button_primary}
            onClick={handleAddCategory}
          >
            Add Category
          </Button>
        </Modal.Footer>
      </Modal>

      <ProductTable />
    </div>
  );
}
