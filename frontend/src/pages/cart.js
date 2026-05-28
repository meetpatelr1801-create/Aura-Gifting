import { useEffect, useState } from "react";

import {
  FaTrash,
  FaShoppingCart
} from "react-icons/fa";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import "../styles/home.css";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

  // LOAD CART

  useEffect(() => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(cart);

  }, []);

  // REMOVE ITEM

  const removeItem = (index) => {

    const updatedCart =
      [...cartItems];

    updatedCart.splice(index, 1);

    setCartItems(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // TOTAL

  const total =
    cartItems.reduce(

      (acc, item) =>

        acc + Number(item.price),

      0
    );

  return (

    <div>

      <Navbar />

      <div className="cart-page">

        <h1 className="cart-title">

          <FaShoppingCart />

          My Cart

        </h1>

        {

          cartItems.length === 0 ? (

            <div className="empty-cart">

              <h2>
                Your cart is empty
              </h2>

            </div>

          ) : (

            <div className="cart-grid">

              {/* LEFT */}

              <div className="cart-items">

                {

                  cartItems.map(

                    (item, index) => (

                      <div
                        className="cart-card"
                        key={index}
                      >

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                        <div className="cart-info">

                          <h2>
                            {item.name}
                          </h2>

                          <p>
                            ₹{item.price}
                          </p>

                        </div>

                        <button
                          className="remove-btn"
                          onClick={() =>
                            removeItem(index)
                          }
                        >

                          <FaTrash />

                        </button>

                      </div>

                    )

                  )

                }

              </div>

              {/* RIGHT */}

              <div className="cart-summary">

                <h2>
                  Order Summary
                </h2>

                <div className="summary-row">

                  <span>
                    Items
                  </span>

                  <span>
                    {cartItems.length}
                  </span>

                </div>

                <div className="summary-row">

                  <span>
                    Total
                  </span>

                  <span>
                    ₹{total}
                  </span>

                </div>

                <button className="checkout-btn"onClick={() =>
                window.location.href ="/checkout"
                }/>

              </div>

            </div>

          )

        }

      </div>

      <Footer />

    </div>

  );
}

export default Cart;