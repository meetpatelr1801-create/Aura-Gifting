import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

import "../styles/home.css";

function Home() {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

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

  useEffect(() => {

    fetchProducts();

  }, []);

  // Filter Products
  const filteredProducts = products.filter(
    (product) => {

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All"
          ? true
          : product.category === category;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  return (
    <div>

      <Navbar />

      {/* Hero Section */}
      <section className="hero">

        <div className="hero-content">

          <h1>Aura Gifting</h1>

          <p>
            Elegant Hampers & Luxury Bouquets
          </p>

        </div>

      </section>

      {/* Search & Filter */}
      <div className="search-filter">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >

          <option value="All">
            All Categories
          </option>

          <option value="Bouquet">
            Bouquet
          </option>

          <option value="Hamper">
            Hamper
          </option>

        </select>

      </div>

      {/* Products */}
      <section className="products-section">

        <h1 className="product-title">
          Featured Products
        </h1>

        <div className="products-container">

          {
            filteredProducts.length === 0 ? (

              <h2>No Products Found</h2>

            ) : (

              filteredProducts.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            )
          }

        </div>

      </section>

    </div>
  );
}

export default Home;