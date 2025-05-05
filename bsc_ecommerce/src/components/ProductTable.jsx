import React, { useState } from "react";
import ProductList from "../data/ProductList";

export default function ProductTable(props) {
  const [products, setProducts] = useState(ProductList);

  const handleAddQuantity = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

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
  };

  return (
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
                onClick={() => handleAddQuantity(product.product_id)}
              >
                Add Quantity
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
