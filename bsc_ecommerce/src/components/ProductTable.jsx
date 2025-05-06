import React, { useState } from "react";
import ProductList from "../data/ProductList";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGlobalData } from "../data/GlobalData";
import axiosInstance from "./axios";
import { data } from "react-router-dom";

export default function ProductTable(props) {
  const { user } = useGlobalData();

  const [products, setProducts] = useState(ProductList);
  const [addForm, setAddForm] = useState({
    user_id: user.user_id,
  });
  const [show, setShow] = useState(false);

  const styles = {
    table: {
      width: "80%",
      margin: "20px auto",
      borderCollapse: "collapse",
      backgroundColor: "#FFF8DC",
      border: "1px solid #8B4512",
    },
    th: {
      backgroundColor: "#8B4512",
      color: "#FFF",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      padding: "10px",
      borderBottom: "1px solid #8B4512",
      textAlign: "left",
    },
    button: {
      backgroundColor: "#8B4512",
      color: "#FFF",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
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

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setAddForm({ ...addForm, product_id: e.target.value });
    setShow(true);
  };

  const handleAddQuantity = (e) => {
    e.preventDefault();

    axiosInstance
      .post("stock", addForm)
      .then((res) => {
        alert(res.data.message);
        props.setProducts(res.data.data);
        setShow(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Product Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Price</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.products.map((product, index) => (
            <tr key={index}>
              <td style={styles.td}>{product.product_name}</td>
              <td style={styles.td}>{product.category}</td>
              <td style={styles.td}>₱{product.product_price}</td>
              <td style={styles.td}>{product.quantity ?? "0"}</td>
              <td style={styles.td}>
                <button
                  style={styles.button}
                  value={product.product_id}
                  onClick={handleShow}
                >
                  Add Quantity
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose} centered>
        <form onSubmit={handleAddQuantity}>
          <Modal.Header closeButton style={styles.modal_header}>
            <Modal.Title>Add Quantity</Modal.Title>
          </Modal.Header>
          <Modal.Body style={styles.modal_body}>
            <input
              type="number"
              placeholder="Enter Quantity"
              onChange={(e) =>
                setAddForm({ ...addForm, quantity: e.target.value })
              }
              style={styles.modal_input}
              required
            />
          </Modal.Body>
          <Modal.Footer style={styles.modal_footer}>
            <Button
              variant="secondary"
              onClick={handleClose}
              style={styles.modal_button_secondary}
            >
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              style={styles.modal_button_primary}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}
