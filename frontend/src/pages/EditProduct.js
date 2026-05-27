import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
    description: ""
  });

  // Fetch Product
  const fetchProduct = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/api/products"
      );

      const foundProduct = response.data.find(
        (item) => item.id === parseInt(id)
      );

      setProduct(foundProduct);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchProduct();

  }, []);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.put(
        `http://127.0.0.1:5000/api/update-product/${id}`,
        product
      );

      alert(response.data.message);

      navigate("/manage-products");

    } catch (error) {

      console.log(error);

      alert("Failed To Update Product");

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

          <h1>Edit Product</h1>

          <input
            type="text"
            name="name"
            value={product.name || ""}
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            value={product.price || ""}
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="image"
            value={product.image || ""}
            placeholder="Image URL"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            value={product.category || ""}
            placeholder="Category"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={product.description || ""}
            placeholder="Description"
            onChange={handleChange}
            style={{
              padding: "15px",
              borderRadius: "10px",
              border: "1px solid #ddd"
            }}
          />

          <button type="submit">
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;