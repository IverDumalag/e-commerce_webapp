import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import ProductCard from "./ProductCard.jsx";
import ProductList from "../data/ProductList.jsx";
import AccountList from "../data/AccountList.jsx";
import axiosInstance from "./axios.jsx";

export default function HomePage({ cartItems, addToCart }) {
  const styles = {
    home_container: {
      width: "100%",
      backgroundColor: "#DEB887", // Light brown background
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    search_filter_container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "80%",
      marginBottom: "20px",
      backgroundColor: "#FFF8DC", // Beige background
      padding: "15px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    search_input: {
      width: "60%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #8B4512", // Dark brown border
      backgroundColor: "#F5F5DC", // Beige background
      color: "#5C4033", // Dark brown text
      fontSize: "1rem",
    },
    filter_select: {
      width: "30%",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #8B4512", // Dark brown border
      backgroundColor: "#F5F5DC", // Beige background
      color: "#5C4033", // Dark brown text
      fontSize: "1rem",
    },
  };

  const location = useLocation();
  const username = location.state?.username || "Guest";

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("0"); // Default: All categories
  const [productList, setProductList] = useState([]);

  // productList
  //     product_id: 1,
  //     product_name: 'Apple',
  //     category_id: 1,
  //     description: 'Fresh and juicy apples.',
  //     user_id: 1,
  //     product_image: AppleImage,
  //     product_price: 50.00,
  //     quantity: 10,

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`${product.product_name} has been added to your cart!`);
  };

  const loggedInAccount = AccountList.getAccountLoggedIn();
  const userRole = loggedInAccount.role;

  // Filter products based on search term and selected category
  const filteredProducts = productList.filter((product) => {
    const matchesSearch = product.product_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "0" ||
      product.category_id === parseInt(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    axiosInstance
      .get("products")
      .then((res) => {
        setProductList(res.data.products);
        // console.log(res.data.products);
      })
      .catch((err) => {
        console.error(err);
      });

    axiosInstance
      .get("category")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div style={styles.home_container}>
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar />
      </div>

      {/* Search and Filter Bar */}
      <div style={styles.search_filter_container}>
        <input
          type="text"
          placeholder="Search for products..."
          style={styles.search_input}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          style={styles.filter_select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="0">All Categories</option>
          {categories.map((data, index) => {
            return (
              <option key={index} value={data.category_id}>
                {data.category}
              </option>
            );
          })}
          {/* <option value="1">Fruits</option>
          <option value="2">Vegetables</option>
          <option value="3">Spices</option> */}
        </select>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          width: "80%",
          marginTop: "20px",
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            products={product}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
