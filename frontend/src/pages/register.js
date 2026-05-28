import { useState } from "react";

import axios from "axios";

import {
  FaUserPlus,
  FaTimes
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "../styles/home.css";

function Register() {

  const [formData, setFormData] =
    useState({

      username: "",

      name: "",

      email: "",

      password: ""

    });

  // HANDLE INPUT

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  // REGISTER

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

  `${process.env.REACT_APP_API_URL}/api/register`,

  formData

);

alert(response.data.message);

      // REDIRECT TO LOGIN

      window.location.href =
        "/login";

    } catch (error) {

      alert(
        "Registration Failed"
      );

    }
  };

  return (

    <div className="login-page">

      <div className="login-modal">

        {/* CLOSE */}

        <Link
          to="/"
          className="close-btn"
        >

          <FaTimes />

        </Link>


        {/* TABS */}

        <div className="login-tabs">

          <Link
            to="/login"
            className="tab-link"
          >

            Login

          </Link>

          <button className="active-tab">

            Register

          </button>

        </div>


        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* USERNAME */}

          <label>
            Username
          </label>

          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            onChange={handleChange}
            required
          />

          {/* FULL NAME */}

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Your full name"
            onChange={handleChange}
            required
          />

          {/* EMAIL */}

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            onChange={handleChange}
            required
          />

          {/* PASSWORD */}

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            onChange={handleChange}
            required
          />

          {/* BUTTON */}

          <button
            type="submit"
            className="luxury-login-btn"
          >

            <FaUserPlus />

            Register

          </button>

        </form>

      </div>

    </div>

  );
}

export default Register;