import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube
} from "react-icons/fa";

import "../styles/home.css";

function SocialMedia() {

  return (

    <div>

      <Navbar />

      <div className="social-page">

        {/* HERO */}

        <div className="social-hero">

          <h1>
            Follow Aura Gifting
          </h1>

          <p>
            Stay connected for luxury gifts,
            offers & elegant inspiration
          </p>

        </div>


        {/* SOCIAL CARDS */}

        <div className="social-grid">

          {/* INSTAGRAM */}

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="social-card"
          >

            <div className="social-icon">

              <FaInstagram />

            </div>

            <h2>
              Instagram
            </h2>

            <p>
              Elegant gift inspirations
              & luxury bouquet reels.
            </p>

          </a>


          {/* FACEBOOK */}

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="social-card"
          >

            <div className="social-icon">

              <FaFacebookF />

            </div>

            <h2>
              Facebook
            </h2>

            <p>
              Join our gifting community
              and festive updates.
            </p>

          </a>


          {/* TWITTER */}

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="social-card"
          >

            <div className="social-icon">

              <FaTwitter />

            </div>

            <h2>
              Twitter
            </h2>

            <p>
              Latest offers & trending
              gifting ideas.
            </p>

          </a>


          {/* PINTEREST */}

          <a
            href="https://pinterest.com"
            target="_blank"
            rel="noreferrer"
            className="social-card"
          >

            <div className="social-icon">

              <FaPinterestP />

            </div>

            <h2>
              Pinterest
            </h2>

            <p>
              Save aesthetic gift box
              inspirations.
            </p>

          </a>


          {/* YOUTUBE */}

          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="social-card"
          >

            <div className="social-icon">

              <FaYoutube />

            </div>

            <h2>
              YouTube
            </h2>

            <p>
              Watch bouquet making &
              luxury hamper videos.
            </p>

          </a>

        </div>

      </div>

      <Footer />

    </div>

  );
}

export default SocialMedia;