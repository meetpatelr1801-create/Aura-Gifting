import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function ManageProducts() {

  const [products, setProducts] = useState([]);

  // Fetch Products
  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/products"
      );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Delete Product
  const deleteProduct = async (id) => {

    try {

      const response = await axios.delete(
        `http://127.0.0.1:5000/api/delete-product/${id}`
      );

      alert(response.data.message);

      fetchProducts();

    } catch (error) {

      console.log(error);

      alert("Failed To Delete Product");

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

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
          Manage Products
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px"
          }}
        >

          {
            products.map((product) => (

              <div
                key={product.id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "20px",
                  boxShadow:
                    "0px 2px 10px rgba(0,0,0,0.1)"
                }}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px"
                  }}
                />

                <h2>{product.name}</h2>

                <p>
                  ₹ {product.price}
                </p>

                <p>
                  {product.category}
                </p>

                <Link
  to={`/edit-product/${product.id}`}
>

  <button
    style={{
      background: "#c2185b",
      color: "white",
      border: "none",
      padding: "12px 20px",
      borderRadius: "10px",
      cursor: "pointer",
      marginRight: "10px"
    }}
  >
    Edit Product
  </button>

</Link>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default ManageProducts;