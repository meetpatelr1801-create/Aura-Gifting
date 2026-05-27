import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/home.css";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post(
        "http://127.0.0.1:5000/api/login",
        formData
      );

      alert(response.data.message);

      // Save user in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

    } catch (error) {

      alert("Invalid Email or Password");

    }
  };

  return (
    <div>

      <Navbar />

      <div className="form-container">

        <form className="form-box" onSubmit={handleSubmit}>

          <h1>Login</h1>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;