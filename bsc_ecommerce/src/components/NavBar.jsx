import { Stack } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function NavBar({ username, role }) {
  const styles = {
    nav_container: {
      backgroundColor: "#8B4512",
      padding: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    nav_item: {
      color: "#FFFFFF",
      textDecoration: "none",
      marginRight: "20px",
    },
    user_info: {
      display: "flex",
      alignItems: "center",
      color: "#FFFFFF",
    },
    user_icon: {
      marginRight: "8px",
    },
  };

  return (
    <div style={styles.nav_container}>
      <Nav>
        <Nav.Link
          as={Link}
          to="/home"
          style={styles.nav_item}
          state={{ username }}
        >
          Home
        </Nav.Link>
        <Nav.Link
          as={Link}
          to="/cart"
          style={styles.nav_item}
          state={{ username }}
        >
          Cart
        </Nav.Link>
        {role !== "buyer" && (
          <>
            <Nav.Link
              as={Link}
              to="/addproduct"
              style={styles.nav_item}
              state={{ username }}
            >
              Add Product
            </Nav.Link>
          </>
        )}
      </Nav>
      <div style={styles.user_info}>
        <Nav.Link
          className="d-flex align-items-center gap-2"
          as={Link}
          to="/seller_registration"
          style={styles.nav_item}
          state={{ username }}
        >
          <FaUser style={styles.user_icon} />
          <Stack>
            <span>{username}</span>
            <span>{role}</span>
          </Stack>
        </Nav.Link>
      </div>
    </div>
  );
}
