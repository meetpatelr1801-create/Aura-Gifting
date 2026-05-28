import Navbar from "../components/Navbar";

import Footer from "../components/Footer";

import "../styles/home.css";

function Contact() {

  return (

    <div>

      <Navbar />

      {/* HERO */}

      <section className="contact-hero">

        <div className="shop-overlay">

          <h1>
            Contact Aura Gifting
          </h1>

          <p>
            We would love to hear from you
          </p>

        </div>

      </section>

      {/* CONTACT SECTION */}

      <section className="contact-section">

        <h1 className="section-title">

          Get in Touch

        </h1>

        <div className="contact-grid">

          {/* LEFT */}

          <div className="contact-info">

            <h3>
              Contact Information
            </h3>

            <div className="contact-item">

              <span>📍</span>

              <p>
                Ahmedabad, Gujarat
              </p>

            </div>

            <div className="contact-item">

              <span>📞</span>

              <p>
                +91 9876543210
              </p>

            </div>

            <div className="contact-item">

              <span>✉️</span>

              <p>
                support@auragifting.com
              </p>

            </div>

            <div className="contact-item">

              <span>🕒</span>

              <p>
                Mon - Sat:
                9:00 AM - 6:00 PM
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="contact-form">

            <h3>
              Send Us a Message
            </h3>

            <input
              type="text"
              placeholder="Your Name"
            />

            <input
              type="email"
              placeholder="Your Email"
            />

            <textarea
              placeholder="Your Message"
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

export default Contact;