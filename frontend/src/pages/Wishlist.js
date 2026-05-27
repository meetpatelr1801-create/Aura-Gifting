import { useContext } from "react";

import Navbar from "../components/Navbar";

import { WishlistContext }
from "../context/WishlistContext";

import { CartContext }
from "../context/CartContext";

function Wishlist() {

  const {
    wishlistItems,
    removeFromWishlist
  } = useContext(WishlistContext);

  const { addToCart } =
    useContext(CartContext);

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
          My Wishlist
        </h1>

        {
          wishlistItems.length === 0 ? (

            <h2>Wishlist Is Empty</h2>

          ) : (

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px"
              }}
            >

              {
                wishlistItems.map((item) => (

                  <div
                    key={item.id}
                    style={{
                      background: "white",
                      padding: "20px",
                      borderRadius: "20px",
                      boxShadow:
                        "0px 2px 10px rgba(0,0,0,0.1)"
                    }}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "220px",
                        objectFit: "cover",
                        borderRadius: "10px"
                      }}
                    />

                    <h2>{item.name}</h2>

                    <p>
                      ₹ {item.price}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px"
                      }}
                    >

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                      >
                        Add To Cart
                      </button>

                      <button
                        onClick={() =>
                          removeFromWishlist(item.id)
                        }
                        style={{
                          background: "red",
                          color: "white",
                          border: "none",
                          padding: "10px",
                          borderRadius: "10px",
                          cursor: "pointer"
                        }}
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))
              }

            </div>

          )
        }

      </div>

    </div>
  );
}

export default Wishlist;