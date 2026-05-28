import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  FaPlus,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers
} from "react-icons/fa";

import "../styles/home.css";

function AdminDashboard() {

  return (

    <div>

      <Navbar />

      <div className="admin-page">

        <div className="admin-header">

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your Aura Gifting store
          </p>

        </div>

        <div className="admin-grid">

          {/* ADD PRODUCT */}

          <div className="admin-card">

            <div className="admin-icon">
              <FaPlus />
            </div>

            <h2>
              Add Product
            </h2>

            <p>
              Add luxury hampers,
              bouquets & gifts.
            </p>

            <Link
              to="/add-product"
              className="admin-btn"
            >
              Add Now
            </Link>

          </div>


          {/* MANAGE PRODUCTS */}

          <div className="admin-card">

            <div className="admin-icon">
              <FaBoxOpen />
            </div>

            <h2>
              Manage Products
            </h2>

            <p>
              Edit or delete
              existing products.
            </p>

            <Link
              to="/manage-products"
              className="admin-btn"
            >
              Manage
            </Link>

          </div>


          {/* ORDERS */}

          <div className="admin-card">

            <div className="admin-icon">
              <FaShoppingBag />
            </div>

            <h2>
              Orders
            </h2>

            <p>
              View customer orders
              and payments.
            </p>

            <button className="admin-btn">

              View Orders

            </button>

          </div>


          {/* CUSTOMERS */}

          <div className="admin-card">

            <div className="admin-icon">
              <FaUsers />
            </div>

            <h2>
              Customers
            </h2>

            <p>
              Manage customer
              information.
            </p>

            <button className="admin-btn">

              View Customers

            </button>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;