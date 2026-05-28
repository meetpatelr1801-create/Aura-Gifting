import { useParams } from "react-router-dom";

import {
  useEffect,
  useState,
  useContext
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import { CartContext }
from "../context/CartContext";

function ProductDetails() {

  const { id } = useParams();

  const { addToCart } =
    useContext(CartContext);

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [reviewData, setReviewData] =
    useState({
      rating: 5,
      comment: ""
    });

    const [quantity, setQuantity] =
  useState(1);

  // Fetch Product + Reviews
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const response = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/products`
);

        const foundProduct =
          response.data.find(
            (item) =>
              item.id === parseInt(id)
          );

        setProduct(foundProduct);

      } catch (error) {

        console.log(error);

      }
    };

    const fetchReviews = async () => {

      try {

        const response = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/reviews/${id}`
);

        setReviews(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchProduct();

    fetchReviews();

  }, [id]);

  // Submit Review
  const submitReview = async () => {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {

      alert("Please Login First");

      return;
    }

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/add-review`,
        {
          productId: product.id,
          userName: user.name,
          rating: reviewData.rating,
          comment: reviewData.comment
        }
      );

      alert(response.data.message);

      // Refresh Reviews
      const reviewResponse = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/reviews/${id}`
);

      setReviews(reviewResponse.data);

      // Clear Input
      setReviewData({
        rating: 5,
        comment: ""
      });

    } catch (error) {

      console.log(error);

      alert("Failed To Add Review");

    }
  };

  // Product Not Found
  if (!product) {

    return (
      <div>

        <Navbar />

        <h1
          style={{
            textAlign: "center",
            marginTop: "100px"
          }}
        >
          Product Not Found
        </h1>

      </div>
    );
  }

  return (
    <div>

      <Navbar />

      <div
        style={{
          display: "flex",
          gap: "50px",
          padding: "50px",
          flexWrap: "wrap"
        }}
      >

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "400px",
            borderRadius: "20px",
            objectFit: "cover"
          }}
        />

        {/* Product Details */}
        <div
          style={{
            flex: 1,
            minWidth: "300px"
          }}
        >

          <h1>{product.name}</h1>

          <h2
            style={{
              color: "#c2185b"
            }}
          >
            ₹ {product.price}
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              marginTop: "20px"
            }}
          >
            {product.description}
          </p>

          <p
            style={{
              marginTop: "20px",
              fontWeight: "bold"
            }}
          >
            Category:
            {" "}
            {product.category}
          </p>

          {/* Quantity Selector */}

<div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginTop: "20px"
  }}
>

  <button
    onClick={() =>
      quantity > 1 &&
      setQuantity(quantity - 1)
    }
  >
    -
  </button>

  <h3>{quantity}</h3>

  <button
    onClick={() =>
      setQuantity(quantity + 1)
    }
  >
    +
  </button>

</div>

{/* Delivery Date */}

<input
  type="date"
  style={{
    padding: "12px",
    marginTop: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  }}
/>

{/* Gift Message */}

<textarea
  placeholder="Write a gift message..."
  style={{
    width: "100%",
    height: "120px",
    marginTop: "20px",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  }}
></textarea>

{/* Add To Cart Button */}

<button
  onClick={() =>
    addToCart({
      ...product,
      quantity
    })
  }
  style={{
    padding: "15px 30px",
    background:
      "linear-gradient(90deg,#f8c7d8,#d4af37)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    marginTop: "30px",
    fontSize: "16px"
  }}
>
  Add To Cart
</button>

          {/* Reviews Section */}
          <div
            style={{
              marginTop: "50px"
            }}
          >

            <h2>
              Customer Reviews
            </h2>

            {/* Add Review */}
            <div
              style={{
                marginTop: "20px",
                marginBottom: "30px"
              }}
            >

              <select
                value={reviewData.rating}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    rating: e.target.value
                  })
                }
                style={{
                  padding: "10px",
                  marginRight: "10px"
                }}
              >

                <option value="5">
                  5 ⭐
                </option>

                <option value="4">
                  4 ⭐
                </option>

                <option value="3">
                  3 ⭐
                </option>

                <option value="2">
                  2 ⭐
                </option>

                <option value="1">
                  1 ⭐
                </option>

              </select>

              <input
                type="text"
                placeholder="Write review..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    comment: e.target.value
                  })
                }
                style={{
                  padding: "10px",
                  width: "300px",
                  marginRight: "10px",
                  borderRadius: "10px",
                  border: "1px solid #ddd"
                }}
              />

              <button
                onClick={submitReview}
                style={{
                  padding: "10px 20px",
                  background: "#c2185b",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Submit
              </button>

            </div>

            {/* Review List */}
            {
              reviews.length === 0 ? (

                <p>No Reviews Yet</p>

              ) : (

                reviews.map((review) => (

                  <div
                    key={review.id}
                    style={{
                      background: "#fff",
                      padding: "15px",
                      marginBottom: "15px",
                      borderRadius: "10px",
                      boxShadow:
                        "0px 2px 10px rgba(0,0,0,0.1)"
                    }}
                  >

                    <h4>
                      {review.user_name}
                    </h4>

                    <p>
                      {"⭐".repeat(review.rating)}
                    </p>

                    <p>
                      {review.comment}
                    </p>

                  </div>

                ))

              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;