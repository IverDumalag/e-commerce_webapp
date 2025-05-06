import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import StandImage from "../assets/stand.png";
import { useContext } from "react";
import { cartContext } from "../App";

export default function ProductCard({ products }) {
  const cart = useContext(cartContext);

  const styles = {
    card_container: {
      width: "18rem",
      margin: "10px",
      border: "1px solid #a0522d",
      backgroundColor: "#f5f5dc",
      color: "#5c4033",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    card_image: {
      height: "200px",
      objectFit: "cover",
      borderTopLeftRadius: "10px",
      borderTopRightRadius: "10px",
    },
    card_title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#5c4033",
    },
    card_price: {
      fontSize: "1.2rem",
      color: "#8b4513",
    },
    stand_img: {
      width: "550px",
      height: "550px",
      backgroundSize: "cover",
      backgroundImage: `url(${StandImage})`,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    button_container: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px",
    },
    button: {
      backgroundColor: "#a0522d",
      borderColor: "#8b4513",
      color: "#fff",
    },
  };

  const addToCart = () => {
    let isExisting = false;
    // check if existing
    cart.cartItems.map((data) => {
      if (data.product_id == products.product_id) {
        isExisting = true;
        // increase quantity
        data.quantity++;
        return;
      }
    });

    // not existing
    if (!isExisting) {
      cart.setCartItems([...cart.cartItems, { ...products, quantity: 1 }]);
    }
  };

  return (
    <div className="stand_img" style={styles.stand_img}>
      <Card style={styles.card_container}>
        <Card.Img
          variant="top"
          src={
            "http://localhost/e-commerce_webapp/laravel_con_bsc_ecommerce/public/" +
            products.product_image
          }
          alt={products.product_name}
          style={styles.card_image}
        />
        <Card.Body>
          <Card.Title style={styles.card_title}>
            {products.product_name}
          </Card.Title>
          <Card.Text style={styles.card_category}>
            {products.category}
          </Card.Text>{" "}
          {/*For sorting remove when it backend is working*/}
          <Card.Text style={styles.card_price}>
            ₱{products.product_price}
          </Card.Text>
          <Card.Text style={styles.card_description}>
            {products.description}
          </Card.Text>
          <div style={styles.button_container}>
            <Button style={styles.button} onClick={addToCart}>
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
