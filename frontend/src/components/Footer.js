import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {

  return (

    <footer className="footer">

      <div className="footer-grid">

        {/* LEFT */}

        <div className="footer-box">

          <h2>
            Aura Gifting
          </h2>

          <p>
            Making every surprise special
            since 2025. We curate beautiful
            gifts for all occasions.
          </p>

          {/* SOCIAL ICONS */}

          <div className="social-buttons">

            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
            >

              <FaFacebookF />

            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
            >

              <FaInstagram />

            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
            >

              <FaTwitter />

            </a>

            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
            >

              <FaPinterestP />

            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-box">

          <h2>
            Quick Links
          </h2>

          <Link to="/">
            Home
          </Link>

          <Link to="/shop">
            Shop
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        {/* CUSTOMER SERVICE */}

        <div className="footer-box">

          <h2>
            Customer Service
          </h2>

          <button className="footer-btn">

            FAQ

          </button>

          <button className="footer-btn">

            Privacy Policy

          </button>

          <button className="footer-btn">

            Return Policy

          </button>

        </div>


        {/* NEWSLETTER */}

        <div className="footer-box">

          <h2>
            Newsletter
          </h2>

          <p>
            Subscribe for exclusive offers
            and updates!
          </p>

          <input
            type="email"
            placeholder="Your email"
          />

          <button className="subscribe-btn">

            Subscribe

          </button>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="footer-bottom">

        © 2025 Aura Gifting.
        All rights reserved.

      </div>

    </footer>

  );
}

export default Footer;