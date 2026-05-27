import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../styles/home.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
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
        "http://127.0.0.1:5000/api/register",
        formData
      );

      alert(response.data.message);

    } catch (error) {

      alert("Registration Failed");

    }
  };

  return (
    <div>

      <Navbar />

      <div className="form-container">

        <form className="form-box" onSubmit={handleSubmit}>

          <h1>Register</h1>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
            required
          />

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
            Register
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;