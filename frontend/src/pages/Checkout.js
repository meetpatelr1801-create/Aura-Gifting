import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import "../styles/home.css";

function Checkout() {

  const [cartItems, setCartItems] =
    useState([]);

  const [formData, setFormData] =
    useState({

      name: "",

      phone: "",

      city: "",

      pincode: "",

      address: ""

    });

  // LOAD CART

  useEffect(() => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(cart);

  }, []);

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // TOTAL PRICE

  const total =
    cartItems.reduce(

      (acc, item) =>

        acc + Number(item.price),

      0
    );

  // RAZORPAY PAYMENT

  const handleSubmit = async (e) => {

    e.preventDefault();

    // CHECK EMPTY CART

    if (cartItems.length === 0) {

      alert("Cart is Empty");

      return;

    }

    const options = {

      key: "rzp_test_Su58Ho24FBCS09",

      amount: total * 100,

      currency: "INR",

      name: "Aura Gifting",

      description: "Luxury Gift Purchase",

      image:
        "https://cdn-icons-png.flaticon.com/512/869/869636.png",

      handler: function (response) {

        alert(
          "Payment Successful"
        );

        console.log(response);

        // CLEAR CART

        localStorage.removeItem("cart");

        // REDIRECT

        window.location.href = "/";
      },

      prefill: {

        name: formData.name,

        contact: formData.phone

      },

      notes: {

        address:
          formData.address

      },

      theme: {

        color: "#d4af37"

      }

    };

    const razorpay =
      new window.Razorpay(
        options
      );

    razorpay.open();
  };

  return (

    <div>

      <Navbar />

      <div className="checkout-page">

        {/* LEFT SIDE */}

        <div className="checkout-form-box">

          <h1>
            Shipping Address
          </h1>

          <form onSubmit={handleSubmit}>

            {/* NAME */}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* PHONE */}

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* CITY */}

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            {/* PINCODE */}

            <input
              type="text"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />

            {/* ADDRESS */}

            <textarea
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>

            {/* BUTTON */}

            <button
              type="submit"
              className="place-order-btn"
            >

              Proceed to Checkout

            </button>

          </form>

        </div>


        {/* RIGHT SIDE */}

        <div className="checkout-summary">

          <h1>
            Order Summary
          </h1>

          {

            cartItems.length === 0 ? (

              <p>
                Your Cart is Empty
              </p>

            ) : (

              cartItems.map(

                (item, index) => (

                  <div
                    className="checkout-item"
                    key={index}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>

                )

              )

            )

          }

          {/* TOTAL */}

          <h2 className="checkout-total">

            Grand Total:
            ₹ {total}

          </h2>

        </div>

      </div>

      <Footer />

    </div>

  );
}

export default Checkout;