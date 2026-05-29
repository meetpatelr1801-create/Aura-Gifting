import { useState } from "react";

import axios from "axios";

import {
  FaSignInAlt,
  FaUserPlus,
  FaTimes,
  FaTrash
} from "react-icons/fa";

import "../styles/home.css";

function Login() {

  // ACTIVE TAB

  const [activeTab, setActiveTab] =
    useState("login");

  // LOGIN DATA

  const [loginData, setLoginData] =
    useState({

      email: "",

      password: ""

    });

  // REGISTER DATA

  const [registerData, setRegisterData] =
    useState({

      name: "",

      email: "",

      password: ""

    });

  // LOGIN INPUT

  const handleLoginChange = (e) => {

    setLoginData({

      ...loginData,

      [e.target.name]:
        e.target.value

    });

  };

  // REGISTER INPUT

  const handleRegisterChange = (e) => {

    setRegisterData({

      ...registerData,

      [e.target.name]:
        e.target.value

    });

  };

  // LOGIN

const handleLogin = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(

      `${process.env.REACT_APP_API_URL}/api/login`,

      loginData

    );

    console.log("SUCCESS:", response.data);

    alert(response.data.message);

    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    if (
      response.data.user.role === "admin"
    ) {

      window.location.href = "/admin";

    } else {

      window.location.href = "/";

    }

  } catch (error) {

    console.log(
      "LOGIN ERROR:",
      error.response?.data
    );

    alert(
      error.response?.data?.message ||
      error.message
    );

  }

};

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

  `${process.env.REACT_APP_API_URL}/api/register`,

 registerData

);

alert(response.data.message);

      // SWITCH TO LOGIN

      setActiveTab("login");

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

        <button
          className="close-btn"
          onClick={() =>
            window.location.href = "/"
          }
        >

          <FaTimes />

        </button>


        {/* TABS */}

        <div className="login-tabs">

          <button
            className={
              activeTab === "login"
              ? "active-tab"
              : ""
            }
            onClick={() =>
              setActiveTab("login")
            }
          >

            Login

          </button>

          <button
            className={
              activeTab === "register"
              ? "active-tab"
              : ""
            }
            onClick={() =>
              setActiveTab("register")
            }
          >

            Register

          </button>

        </div>


        {/* LOGIN FORM */}

        {

          activeTab === "login" ? (

            <form onSubmit={handleLogin}>

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                onChange={handleLoginChange}
                required
              />

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleLoginChange}
                required
              />

              {/* OPTIONS */}

              <div className="login-options">

                <div className="remember">

                  <input type="checkbox" />

                  <span>
                    Remember me
                  </span>

                </div>

                <p className="forgot-password">

                  Forgot password?

                </p>

              </div>

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="luxury-login-btn"
              >

                <FaSignInAlt />

                Login

              </button>

              {/* CLEAR */}
<div
  className="clear-data"
  onClick={() => {

    localStorage.clear();

    alert("Saved Data Cleared");

    window.location.reload();

  }}
/>

            </form>

          ) : (

            /* REGISTER FORM */

            <form onSubmit={handleRegister}>

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your full name"
                onChange={handleRegisterChange}
                required
              />

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                onChange={handleRegisterChange}
                required
              />

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                onChange={handleRegisterChange}
                required
              />

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="luxury-login-btn"
              >

                <FaUserPlus />

                Register

              </button>

            </form>

          )

        }

      </div>

    </div>

  );
}

export default Login;