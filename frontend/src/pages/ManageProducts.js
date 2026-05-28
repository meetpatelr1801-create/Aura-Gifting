import { useEffect, useState } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/home.css";

function ManageProducts() {

  const [products, setProducts] =
    useState([]);

  // FETCH PRODUCTS

  const fetchProducts = async () => {

    try {

      const response =
        await axios.get(
          "http://127.0.0.1:5000/api/products"
        );

      setProducts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProducts();

  }, []);

  // DELETE PRODUCT

  const deleteProduct = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this product?"
      );

    if (!confirmDelete) {

      return;

    }

    try {

      await axios.delete(

        `http://127.0.0.1:5000/api/delete-product/${id}`

      );

      alert(
        "Product Deleted"
      );

      fetchProducts();

    } catch (error) {

      alert("Delete Failed");

    }
  };

  return (

    <div>

      <Navbar />

      <div className="manage-page">

        <h1 className="manage-title">

          Manage Products

        </h1>

        <div className="manage-grid">

          {

            products.map((product) => (

              <div
                className="manage-card"
                key={product.id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="manage-info">

                  <h2>
                    {product.name}
                  </h2>

                  <p>
                    ₹{product.price}
                  </p>

                  <div className="manage-buttons">

                    <Link
                      to={`/edit-product/${product.id}`}
                      className="edit-btn"
                    >

                      Edit

                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteProduct(product.id)
                      }
                    >

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );
}

export default ManageProducts;