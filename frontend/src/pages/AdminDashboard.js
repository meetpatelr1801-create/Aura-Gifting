import {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function AdminDashboard() {

  const [orders, setOrders] =
    useState([]);

  const [analytics, setAnalytics] =
    useState({
      totalOrders: 0,
      totalRevenue: 0,
      totalProducts: 0
    });

  // Fetch Orders
  const fetchOrders = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/orders"
      );

      setOrders(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Fetch Analytics
  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/analytics"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchOrders();

    fetchAnalytics();

  }, []);

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
          Admin Dashboard
        </h1>

        {/* Analytics Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}
        >

          <div className="dashboard-card">

            <h2>Total Orders</h2>

            <h1>
              {analytics.totalOrders}
            </h1>

          </div>

          <div className="dashboard-card">

            <h2>Total Revenue</h2>

            <h1>
              ₹ {analytics.totalRevenue}
            </h1>

          </div>

          <div className="dashboard-card">

            <h2>Total Products</h2>

            <h1>
              {analytics.totalProducts}
            </h1>

          </div>

        </div>

        {/* Orders */}
        <h2
          style={{
            marginBottom: "20px"
          }}
        >
          Recent Orders
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >

          {
            orders.map((order) => (

              <div
                key={order.id}
                className="dashboard-card"
              >

                <h2>
                  Order #{order.id}
                </h2>

                <p>
                  <strong>Name:</strong>
                  {" "}
                  {order.user_name}
                </p>

                <p>
                  <strong>Total:</strong>
                  {" "}
                  ₹ {order.total_amount}
                </p>

                <p>
                  <strong>Status:</strong>
                  {" "}
                  {order.payment_status}
                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;