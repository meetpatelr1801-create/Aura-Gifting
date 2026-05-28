import { useEffect, useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import ProductCard from "../components/ProductCard";

import Footer from "../components/Footer";

import "../styles/home.css";

function Home() {

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

  useEffect(() => {

    fetchProducts();

  }, []);

  return (

    <div>

      <Navbar />

      {/* HERO SECTION */}

      <section className="hero">

        {/* Floating Circles */}

        <div className="floating-circle one"></div>

        <div className="floating-circle two"></div>

        <div className="floating-circle three"></div>

        <div className="hero-content">

          <h1>
            Make Every Surprise Special
          </h1>

          <p>
            Curated with love, delivered with elegance
          </p>

          <button className="cta-button">
            Shop Collections
          </button>

        </div>

      </section>


      {/* PRODUCTS SECTION */}

      <section className="products-section">

        <h1 className="section-title">
          Featured Products
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


      {/* CONTACT SECTION */}

      <section className="contact-section">

        <h1 className="section-title">
          Get in Touch
        </h1>

        <div className="contact-grid">

          {/* LEFT SIDE */}

          <div className="contact-info">

            <h3>
              Contact Information
            </h3>

            <div className="contact-item">
              <span>📍</span>
              <p>
                Mere ghar ke baju me, GJ01
              </p>
            </div>

            <div className="contact-item">
              <span>📞</span>
              <p>
                +91 246802468
              </p>
            </div>

            <div className="contact-item">
              <span>✉️</span>
              <p>
                sakhi@auragifting.com
              </p>
            </div>

            <div className="contact-item">
              <span>🕒</span>
              <p>
                Mon - Sat: 9:00 AM - 6:00 PM
              </p>
            </div>

          </div>


          {/* RIGHT SIDE */}

          <div className="contact-form">

            <h3>
              Send Us a Message
            </h3>

            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="email"
              placeholder="your@email.com"
            />

            <textarea
              placeholder="Your message..."
            ></textarea>

            <button>
              Send Message
            </button>

          </div>

        </div>

      </section>

      <Footer />

    </div>

  );
}

export default Home;