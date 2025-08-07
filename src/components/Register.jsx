//import React from 'react';
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UseContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./Register.css";
import "./Banner.css";

const MySwal = withReactContent(Swal);

function Register() {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formObject, setFormObject] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormObject((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formObject);
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleAlreadyHaveAccount = () => {
    MySwal.fire({
      title: "Already registered?",
      text: "You already have an account. Please login!",
      icon: "info",
      confirmButtonText: "Go to Login",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
      }
    });
  };

  return (
    <div className="register-container">
      <h1>Please Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            value={formObject.firstname}
            name="firstname"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            value={formObject.lastname}
            name="lastname"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            value={formObject.email}
            name="email"
            type="email"
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            value={formObject.password}
            name="password"
            type="password"
            onChange={handleChange}
          />
        </div>

        <div className="register-buttons">
          <button type="submit">Register</button>
          <button type="button" onClick={handleAlreadyHaveAccount}>
            Already have an account? Login!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;

/*https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register*/
