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

  const [activeTab, setActiveTab] =
    useState("login");

  const [loading, setLoading] =
    useState(false);

  const [loginData, setLoginData] =
    useState({
      email: "",
      password: ""
    });

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
      [e.target.name]: e.target.value
    });

  };

  // REGISTER INPUT

  const handleRegisterChange = (e) => {

    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });

  };

  // LOGIN

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/login`,
        {
          email: loginData.email.trim(),
          password: loginData.password
        }
      );

      console.log(
        "LOGIN SUCCESS:",
        response.data
      );

      if (!response.data.user) {

        alert("User data not received");

        return;

      }

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(
        response.data.message ||
        "Login Successful"
      );

      if (
        response.data.user.role ===
        "admin"
      ) {

        window.location.href =
          "/admin";

      } else {

        window.location.href =
          "/";

      }

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // REGISTER

  const handleRegister = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/register`,
        registerData
      );

      alert(
        response.data.message ||
        "Registration Successful"
      );

      setRegisterData({
        name: "",
        email: "",
        password: ""
      });

      setActiveTab("login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // CLEAR DATA

  const clearData = () => {

    localStorage.clear();

    alert("Saved Data Cleared");

    window.location.reload();

  };

  return (

    <div className="login-page">

      <div className="login-modal">

        <button
          className="close-btn"
          onClick={() =>
            (window.location.href = "/")
          }
        >

          <FaTimes />

        </button>

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

        {

          activeTab === "login" ? (

            <form onSubmit={handleLogin}>

              <label>Email</label>

              <input
                type="email"
                name="email"
                value={loginData.email}
                onChange={
                  handleLoginChange
                }
                placeholder="Enter Email"
                required
              />

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={
                  handleLoginChange
                }
                placeholder="Enter Password"
                required
              />

              <div className="login-options">

                <div className="remember">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Remember me
                  </span>

                </div>

                <p className="forgot-password">

                  Forgot password?

                </p>

              </div>

              <button
                type="submit"
                className="luxury-login-btn"
                disabled={loading}
              >

                <FaSignInAlt />

                {
                  loading
                    ? "Logging in..."
                    : "Login"
                }

              </button>

              <div
                className="clear-data"
                onClick={clearData}
              >

                <FaTrash />

                <span>
                  Clear Saved Data
                </span>

              </div>

            </form>

          ) : (

            <form
              onSubmit={
                handleRegister
              }
            >

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={
                  handleRegisterChange
                }
                placeholder="Enter Full Name"
                required
              />

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={
                  handleRegisterChange
                }
                placeholder="Enter Email"
                required
              />

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={
                  handleRegisterChange
                }
                placeholder="Create Password"
                required
              />

              <button
                type="submit"
                className="luxury-login-btn"
                disabled={loading}
              >

                <FaUserPlus />

                {
                  loading
                    ? "Creating..."
                    : "Register"
                }

              </button>

            </form>

          )

        }

      </div>

    </div>

  );

}

export default Login;