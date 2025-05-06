import NavBar from "./NavBar.jsx";
import { useContext, useEffect, useState } from "react";
import AccountList from "../data/AccountList.jsx";
import { cartContext } from "../App.jsx";
import { useGlobalData } from "../data/GlobalData.jsx";
import axiosInstance from "./axios.jsx";

export default function Cart() {
  const cart = useContext(cartContext);
  const { user } = useGlobalData();

  const header = ["Product", "Price", "Quantity", "Total", "Action"];
  const headerConfirm = [
    "Purchase ID",
    "Product",
    "Price",
    "Quantity",
    "Total",
    "Order Date",
    "Action",
  ];

  const [confirmedList, setConfirmedList] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("confirmedbybuyer", { user_id: user.user_id })
      .then((res) => {
        // console.log(res.data.data);
        setConfirmedList(res.data.data);
        // console.log(confirmedList);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleConfirm = (item, index) => {
    axiosInstance
      .post("confirmCart", { ...item, user_id: user.user_id })
      .then((res) => {
        // setConfirmedList(confirmedList.filter(item2 => item.product_id !==));
        cart.setCartItems(
          cart.cartItems.filter((data) => data.product_id !== item.product_id)
        );

        setConfirmedList(res.data.data);
        alert(res.data.message);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  const handleCancel = (e) => {
    axiosInstance
      .post("cancelorder", {
        user_id: user.user_id,
        purchase_id: e.target.value,
      })
      .then((res) => {
        alert(res.data.message);
        setConfirmedList(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#DEB887",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div style={{ display: "inline-block", width: "100%" }}>
        <NavBar />
      </div>

      {/* Pending Items */}
      <div
        style={{
          margin: "20px auto",
          padding: "25px",
          backgroundColor: "#f5f5dc",
          borderRadius: "10px",
          border: "2px solid #a0522d",
          maxWidth: "800px",
        }}
      >
        <h2 style={{ color: "#5c4033", marginBottom: "20px" }}>
          Pending Purchases
        </h2>
        {cart.cartItems.length === 0 ? (
          <p
            style={{
              color: "#5c4033",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No pending purchases
          </p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
            }}
          >
            <thead>
              <tr>
                {header.map((data, index) => {
                  return (
                    <th
                      key={index}
                      style={{
                        backgroundColor: "#a0522d",
                        color: "#fff",
                        padding: "15px",
                        textAlign: "left",
                        borderBottom: "3px solid #8b4513",
                      }}
                    >
                      {data}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {cart.cartItems.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.product_name}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    ₱{item.product_price}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    ₱{item.product_price * item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#a0522d",
                        color: "#fff",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleConfirm(item, index)}
                    >
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmed Items */}
      {confirmedList.length === 0 ? (
        <></>
      ) : (
        <div
          style={{
            margin: "20px auto",
            padding: "25px",
            backgroundColor: "#f5f5dc",
            borderRadius: "10px",
            border: "2px solid #a0522d",
            maxWidth: "800px",
          }}
        >
          <h2 style={{ color: "#5c4033", marginBottom: "20px" }}>
            Confirmed Purchases
          </h2>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "20px 0",
            }}
          >
            <thead>
              <tr>
                {headerConfirm.map((data, index) => {
                  return (
                    <th
                      key={index}
                      style={{
                        backgroundColor: "#a0522d",
                        color: "#fff",
                        padding: "15px",
                        textAlign: "left",
                        borderBottom: "3px solid #8b4513",
                      }}
                    >
                      {data}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {confirmedList.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.purchase_id}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.product_name}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    ₱{item.product_price}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    ₱{item.product_price * item.quantity}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    {item.created_at}
                  </td>
                  <td
                    style={{
                      padding: "15px",
                      borderBottom: "1px solid #d2b48c",
                      color: "#5c4033",
                    }}
                  >
                    <button
                      style={{
                        backgroundColor: "#a0522d",
                        color: "#fff",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                      value={item.purchase_id}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
