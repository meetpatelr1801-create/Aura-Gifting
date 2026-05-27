import { useContext } from "react";

import Navbar from "../components/Navbar";

import { CartContext } from "../context/CartContext";

import { Link } from "react-router-dom";

function Cart() {

  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  // Calculate Total
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <div>

      <Navbar />

      <div style={{ padding: "40px" }}>

        <h1>Your Cart</h1>

        {
          cartItems.length === 0 ? (

            <p>Cart is Empty</p>

          ) : (

            <>
              {
                cartItems.map((item) => (

                  <div
                    key={item.id}
                    style={{
                      marginBottom: "20px",
                      padding: "20px",
                      background: "#fff",
                      borderRadius: "10px",
                      boxShadow:
                        "0px 2px 10px rgba(0,0,0,0.1)"
                    }}
                  >

                    <h2>{item.name}</h2>

                    <p>₹ {item.price}</p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center"
                      }}
                    >

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                    <h3>
                      Total:
                      ₹ {item.price * item.quantity}
                    </h3>

                    <button
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "5px",
                        cursor: "pointer"
                      }}
                    >
                      Remove
                    </button>

                  </div>

                ))
              }

              <h2>
                Grand Total: ₹ {totalPrice}
              </h2>
              <Link to="/checkout">

  <button
    style={{
      padding: "15px 25px",
      background: "#c2185b",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      marginTop: "20px"
    }}
  >
    Proceed To Checkout
  </button>

</Link>
            </>

          )
        }

      </div>

    </div>
  );
}

export default Cart;