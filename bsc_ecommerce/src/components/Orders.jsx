import React, { useEffect, useState } from "react";
import NavBar from "./NavBar.jsx";
import axiosInstance from "./axios.jsx";
import { useGlobalData } from "../data/GlobalData.jsx";

export default function Orders() {
  const { user } = useGlobalData();

  const header = ["Product", "Price", "Quantity", "Total", "Status"];
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    axiosInstance
      .post("getorder", { user_id: user.user_id })
      .then((res) => {
        setOrderList(res.data.data);
      })
      .catch((err) => {
        console.error(err.response);
      });
  }, []);

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
        <h2 style={{ color: "#5c4033", marginBottom: "20px" }}>Orders</h2>
        {orderList.length === 0 ? (
          <p
            style={{
              color: "#5c4033",
              textAlign: "center",
              padding: "20px",
            }}
          >
            No orders to display.
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
              {orderList.map((item, index) => (
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
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
