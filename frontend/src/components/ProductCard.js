import { Link } from "react-router-dom";

import {
  FaEye
} from "react-icons/fa";

function ProductCard({ product }) {

  // ADD TO CART

  const addToCart = () => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    cart.push(product);

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("Added To Cart");
  };

  return (

    <div className="luxury-product-card">

      {/* PRODUCT IMAGE */}

      <div className="luxury-product-image">

        {

          product.image ? (

            <img
              src={product.image}
              alt={product.name}
            />

          ) : (

            <div className="gift-icon">

              🎁

            </div>

          )

        }

      </div>


      {/* PRODUCT INFO */}

      <div className="luxury-product-info">

        <h2>

          {product.name}

        </h2>

        <p className="luxury-price">

          ₹{product.price}

        </p>

        {/* BUTTONS */}

        <div className="luxury-buttons">

          <button
            className="cart-btn"
            onClick={addToCart}
          >

            Add to Cart

          </button>

          <Link
            to={`/product/${product.id}`}
            className="view-btn"
          >

            <FaEye />

          </Link>

        </div>

      </div>

    </div>

  );
}

export default ProductCard;