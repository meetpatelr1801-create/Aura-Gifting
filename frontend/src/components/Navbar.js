import { Link } from "react-router-dom";

import logo from "../assets/logo.jpg";

import {
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar() {

  // GET USER

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // LOGOUT FUNCTION

  const handleLogout = () => {

    localStorage.removeItem("user");

    window.location.href = "/";

  };

  return (

    <nav className="navbar">

      {/* LOGO */}

      <div className="logo-container">

  <img
    src={logo}
    alt="Aura Gifting"
    className="navbar-logo"
  />

  <h1 className="logo-text">

    Aura Gifting

  </h1>

</div>


      {/* CENTER LINKS */}

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

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px"
        }}
      >

        {

          user ? (

            <button
              className="login-btn"
              onClick={handleLogout}
            >

              <FaSignOutAlt />

              <span>
                Logout
              </span>

            </button>

          ) : (

            <Link
              to="/login"
              className="login-btn"
            >

              <FaSignInAlt />

              <span>
                Login
              </span>

            </Link>

          )

        }
<Link to="/cart">

  <FaShoppingCart
    style={{
      fontSize: "28px",
      color: "#333",
      cursor: "pointer"
    }}
  />

</Link>
      </div>

    </nav>

  );
}

export default Navbar;