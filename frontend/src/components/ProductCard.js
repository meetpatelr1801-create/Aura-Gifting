import { useContext } from "react";

import { CartContext }
from "../context/CartContext";

import { WishlistContext }
from "../context/WishlistContext";

import { Link }
from "react-router-dom";

function ProductCard({ product }) {

  const { addToCart } =
    useContext(CartContext);

  const { addToWishlist } =
    useContext(WishlistContext);

  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        style={{
          textDecoration: "none",
          color: "black"
        }}
      >

        <img
          src={product.image}
          alt={product.name}
        />

        <h2>{product.name}</h2>

        <p>₹ {product.price}</p>

      </Link>

      <div
        style={{
          display: "flex",
          gap: "10px",
          padding: "15px"
        }}
      >

        <button
          onClick={() =>
            addToCart(product)
          }
        >
          Add To Cart
        </button>

        <button
          onClick={() =>
            addToWishlist(product)
          }
          style={{
            background: "#ff4081",
            color: "white",
            border: "none",
            padding: "10px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          ❤️
        </button>

      </div>

    </div>
  );
}

export default ProductCard;