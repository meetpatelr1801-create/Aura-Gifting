import { useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

function AddProduct() {

  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageFile: null
  });

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      // Upload Image
      const formData = new FormData();

      formData.append(
        "image",
        product.imageFile
      );

      const uploadResponse = await axios.post(
        "http://127.0.0.1:5000/api/upload-image",
        formData
      );

      const imageUrl =
        uploadResponse.data.imageUrl;

      // Product Data
      const productData = {
        name: product.name,
        price: product.price,
        image: imageUrl,
        category: product.category,
        description: product.description
      };

      // Save Product
      const response = await axios.post(
        "http://127.0.0.1:5000/api/add-product",
        productData
      );

      alert(response.data.message);

    } catch (error) {

      console.log(error);

      alert("Failed To Add Product");

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

          <h1>Add Product</h1>

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
            type="file"
            onChange={(e) =>
              setProduct({
                ...product,
                imageFile: e.target.files[0]
              })
            }
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
            placeholder="Description"
            onChange={handleChange}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />

          <button type="submit">
            Add Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;