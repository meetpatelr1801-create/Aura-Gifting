import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import "../styles/home.css";

function AddProduct() {

  const [productData, setProductData] =
    useState({

      name: "",

      price: "",

      image: "",

      category: "",

      description: ""

    });

  const handleChange = (e) => {

    setProductData({

      ...productData,

      [e.target.name]:
        e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(

        "http://127.0.0.1:5000/api/add-product",

        productData

      );

      alert(
        "Product Added Successfully"
      );

      window.location.reload();

    } catch (error) {

      alert("Add Product Failed");

    }
  };

  return (

    <div>

      <Navbar />

      <div className="admin-form-page">

        <form
          className="admin-form"
          onSubmit={handleSubmit}
        >

          <h1>
            Add Product
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Product Description"
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">

            Add Product

          </button>

        </form>

      </div>

    </div>

  );
}

export default AddProduct;