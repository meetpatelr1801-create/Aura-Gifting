import { useContext, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

import { CartContext } from "../context/CartContext";

function Checkout() {

  const { cartItems } = useContext(CartContext);

  const [address, setAddress] = useState({
    fullname: "",
    phone: "",
    city: "",
    pincode: "",
    addressLine: ""
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  // Calculate Total
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Payment Function
  const placeOrder = async () => {

    if (cartItems.length === 0) {
      alert("Cart is Empty");
      return;
    }

    try {

      // Create Razorpay Order
      const response = await axios.post(
        "http://127.0.0.1:5000/api/create-order",
        {
          amount: totalPrice
        }
      );

      const order = response.data;

      const options = {

        key: "rzp_test_Su58Ho24FBCS09",

        amount: order.amount,

        currency: "INR",

        name: "Aura Gifting",

        description: "Luxury Gifts Payment",

        order_id: order.id,

        handler: async function (response) {

          try {

            // Save Order In Database
            const saveResponse = await axios.post(
              "http://127.0.0.1:5000/api/save-order",
              {
                fullname: address.fullname,
                userEmail: JSON.parse(localStorage.getItem("user"))?.email,
                phone: address.phone,address: `
                  ${address.addressLine},
                  ${address.city},
                  ${address.pincode}
                `,
                totalAmount: totalPrice,
                cartItems: cartItems
              }
            );

            alert(saveResponse.data.message);

            console.log(response);

          } catch (error) {

            console.log(error);

            alert("Order Save Failed");

          }
        },

        prefill: {
          name: address.fullname,
          contact: address.phone
        },

        notes: {
          address: address.addressLine
        },

        theme: {
          color: "#c2185b"
        }
      };

      const razorpay = new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.log(error);

      alert("Payment Failed");

    }
  };

  return (
    <div>

      <Navbar />

      <div
        style={{
          padding: "40px",
          display: "flex",
          gap: "40px",
          flexWrap: "wrap"
        }}
      >

        {/* Shipping Form */}
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h1>Shipping Address</h1>

          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="addressLine"
            placeholder="Full Address"
            onChange={handleChange}
            style={{
              ...inputStyle,
              height: "100px"
            }}
          />

        </div>

        {/* Order Summary */}
        <div
          style={{
            flex: 1,
            minWidth: "320px",
            background: "white",
            padding: "30px",
            borderRadius: "20px",
            boxShadow:
              "0px 2px 10px rgba(0,0,0,0.1)"
          }}
        >

          <h1>Order Summary</h1>

          {
            cartItems.length === 0 ? (

              <p>Cart is Empty</p>

            ) : (

              cartItems.map((item) => (

                <div
                  key={item.id}
                  style={{
                    marginBottom: "20px",
                    borderBottom: "1px solid #ddd",
                    paddingBottom: "10px"
                  }}
                >

                  <h3>{item.name}</h3>

                  <p>
                    ₹ {item.price} × {item.quantity}
                  </p>

                  <h4>
                    Total:
                    ₹ {item.price * item.quantity}
                  </h4>

                </div>

              ))

            )
          }

          <h2>
            Grand Total: ₹ {totalPrice}
          </h2>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              padding: "15px",
              background: "#c2185b",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "18px",
              marginTop: "20px"
            }}
          >
            Pay Now
          </button>

        </div>

      </div>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  boxSizing: "border-box"
};

export default Checkout;