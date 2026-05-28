import { Link } from "react-router-dom";

import {
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt
} from "react-icons/fa";

import logo from "../assets/logo.jpg";

import "../styles/home.css";

function Navbar() {

  // GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="logo-container">

        <Link
          to="/"
          className="logo-link"
        >

          <img
            src={logo}
            alt="Aura Gifting"
            className="navbar-logo"
          />

        </Link>

        <h1 className="logo-text">

          Aura Gifting

        </h1>

      </div>


      {/* NAV LINKS */}

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/shop">
          Shop
        </Link>

        <Link to="/contact">
          Contact
        </Link>

      </div>


      {/* RIGHT SIDE */}

      <div className="nav-right">

        {

          user ? (

            <button
              className="login-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              Logout

            </button>

          ) : (

            <Link
              to="/login"
              className="login-btn"
            >

              <FaSignInAlt />

              Login

            </Link>

          )

        }

        <Link to="/cart">

          <FaShoppingCart
            className="cart-icon"
          />

        </Link>

      </div>

    </nav>

  );
}

export default Navbar;