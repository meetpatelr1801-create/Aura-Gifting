import React, {
  useEffect,
  useState,
  useCallback
} from "react";

import axios from "axios";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import "../styles/home.css";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [productData, setProductData] =
    useState({

      name: "",

      price: "",

      image: "",

      category: "",

      description: ""

    });

  // ===================================
  // FETCH PRODUCT
  // ===================================

  const fetchProduct = useCallback(
    async () => {

      try {

        const response =
  await axios.get(
    `${process.env.REACT_APP_API_URL}/api/products`
  );

        const singleProduct =
          response.data.find(
            (item) =>
              item.id === parseInt(id)
          );

        if (singleProduct) {

          setProductData(singleProduct);

        }

      } catch (error) {

        console.log(error);

      }

    },

    [id]

  );

  // ===================================
  // USE EFFECT
  // ===================================

  useEffect(() => {

    fetchProduct();

  }, [fetchProduct]);

  // ===================================
  // HANDLE CHANGE
  // ===================================

  const handleChange = (e) => {

    setProductData({

      ...productData,

      [e.target.name]:
        e.target.value

    });

  };

  // ===================================
  // UPDATE PRODUCT
  // ===================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.put(

  `${process.env.REACT_APP_API_URL}/api/update-product/${id}`,

  productData

);

      alert(
        "Product Updated Successfully"
      );

      navigate("/manage-products");

    } catch (error) {

      console.log(error);

      alert("Update Failed");

    }
  };

  return (

    <div>

      <Navbar />

      <div className="form-container">

        <form
          className="form-box"
          onSubmit={handleSubmit}
        >

          <h1>
            Edit Product
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={productData.category}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">

            Update Product

          </button>

        </form>

      </div>

    </div>

  );
}

export default EditProduct;