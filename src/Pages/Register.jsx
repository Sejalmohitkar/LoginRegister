import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    hIN: "",
    username: "",
    password: "",
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function Validation() {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!values.hIN.trim()) {
      errors.hIN = "hIN is required!";
    }

    if (!values.username.trim()) {
      errors.username = "username is required!";
    }

    if (!values.password.trim()) {
      errors.password = "Password is required!";
    } else if (!password_pattern.test(values.password)) {
      errors.password =
        "Password must be at least 6 characters long and include at least 1 letter and 1 number!";
    }

    if (!values.name.trim()) {
      errors.name = "First name is required!";
    }

    if (!values.email.trim()) {
      errors.email = "Email is required!";
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Invalid email format!";
    }

    if (!values.phoneNumber.trim()) {
      errors.phoneNumber = "Phone Number is required!";
    }

    if (!values.address.trim()) {
      errors.address = "Address is required!";
    }

    return errors;
  }

  function handleValidation(e) {
    e.preventDefault();
    const validationErrors = Validation();

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem("user", JSON.stringify(values));
      navigate("/");
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleValidation}>
          <h3 className="text-2xl font-semibold text-center mb-6">Registration Form</h3>

          <div className="mb-2">
            <label htmlFor="hIN" className="block text-sm font-medium mb-1">hIN</label>
            <input
              type="text"
              name="hIN"
              value={values.hIN}
              placeholder="Enter your hIN"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.hIN && <p className="text-red-500 text-sm mt-1">{errors.hIN}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-medium mb-1">UserName</label>
            <input
              type="text"
              name="username"
              value={values.username}
              placeholder="Enter first username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={values.password}
              placeholder="Enter Password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              placeholder="Full name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={values.email}
              placeholder="Enter Email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={values.phoneNumber}
              placeholder="Enter PhoneNumber"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={values.address}
              placeholder="Enter your Address"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4">
            Already Registered?{" "}
            <Link to="/" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
