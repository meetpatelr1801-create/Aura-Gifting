import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  // Fetch Orders

  const fetchOrders = useCallback(
    async () => {

      try {

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/user-orders`
        );

        setOrders(response.data);

      } catch (error) {

        console.log(error);

      }

    },
    []
  );

  useEffect(() => {

    fetchOrders();

  }, [fetchOrders]);

  return (

    <div>

      <Navbar />

      <div style={{ padding: "40px" }}>

        <h1
          style={{
            color: "#c2185b",
            marginBottom: "30px"
          }}
        >
          My Orders
        </h1>

        {

          orders.length === 0 ? (

            <h2>No Orders Found</h2>

          ) : (

            orders.map((order) => (

              <div
                key={order.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "20px",
                  marginBottom: "20px",
                  boxShadow:
                    "0px 2px 10px rgba(0,0,0,0.1)"
                }}
              >

                <h2>
                  Order #{order.id}
                </h2>

                <p>
                  Total: ₹ {order.total_amount}
                </p>

                <p>
                  Status: {order.payment_status}
                </p>

                <p>
                  Date: {order.created_at}
                </p>

              </div>

            ))

          )

        }

      </div>

    </div>

  );
}

export default MyOrders;