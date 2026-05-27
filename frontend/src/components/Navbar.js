import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h1>Aura Gifting</h1>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/cart">Cart</Link>

        {
          user ? (

            <>
              <Link to="/my-orders">
                My Orders
              </Link>

              {
                user.role === "admin" && (

                  <>
                    <Link to="/admin">
                      Admin
                    </Link>

                    <Link to="/add-product">
                      Add Product
                    </Link>

                    <Link to="/manage-products">
                      Manage Products
                    </Link>
                  </>
                )
              }

              <button
                onClick={logout}
                style={{
                  background: "#c2185b",
                  color: "white",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Logout
              </button>
            </>

          ) : (

            <>
              <Link to="/login">
                Login
              </Link>

              <Link to="/register">
                Register
              </Link>
              <Link to="/wishlist">
              Wishlist
              </Link>
            </>

          )
        }

      </div>

    </nav>
  );
}

export default Navbar;