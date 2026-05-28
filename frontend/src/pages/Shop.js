import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

import Footer from "../components/Footer";

import "../styles/home.css";

function Shop() {

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

  return (

    <div>

      <Navbar />

      {/* HERO */}

      <section className="shop-hero">

        <div className="shop-overlay">

          <h1>
            Luxury Gift Collection
          </h1>

          <p>
            Elegant hampers, bouquets &
            personalized surprises
          </p>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="shop-section">

        <h1 className="section-title">

          Shop Gifts

        </h1>

        <div className="products-grid">

          {

            products.length === 0 ? (

              <h2>
                No Products Found
              </h2>

            ) : (

              products.map((product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              ))

            )

          }

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default Shop;