import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerDoctor } from "../../Store/docterConsutant/doctorThunk";

function DoctorRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [values, setValues] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    specialty: "",
    qualifications: "",
    medicalLicenseNumber: "",
    email: "",
    phoneNumber: "",
    yearsOfExperience: "",
    username: "",
    password:"",
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  function validate() {
    const errors = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!values.name) errors.name = "Name is required!";
    if (!values.gender) errors.gender = "gender is required!";
    if (!values.dateOfBirth) errors.dateOfBirth = "dateOfBirth is required!";
    if (!values.specialty) errors.specialty = "Specialty is required!";
    if (!values.qualifications) errors.qualifications = "Qualification is required!";
    if (!values.medicalLicenseNumber) errors.medicalLicenseNumber = "MedicalLicenseNumber is required!";
    if (!values.email) errors.email = "Email is required!";
    else if (!email_pattern.test(values.email)) errors.email = "Invalid email!";
    if (!values.phoneNumber) errors.phoneNumber = "Phone number is required!";
    if (!values.yearsOfExperience) errors.yearsOfExperience = "Experience is required!";
    if (!values.username) errors.username = "Username is required!";
    if (!values.password) errors.password = "Password is required!";
    else if (!password_pattern.test(values.password)) {
        errors.password = "Password must have at least 6 characters, 1 letter, 1 number!";
      }

    return errors;
  }

  const handleSubmit = (e)=> {
    e.preventDefault();
    const validationErrors = validate();
console.log("register cal")
    if (Object.keys(validationErrors).length === 0) {
      try {
       dispatch(registerDoctor(values))
        navigate("/doctor/login");
      } catch (err) {
        console.log("Register failed:",err);
      }
    } else {
      setErrors(validationErrors);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <h3 className="text-2xl font-semibold text-center mb-6"> Doctor Registration Form</h3>
           {error && <p className="text-sm text-center text-red-500">{error}</p>}
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

          <div className="mb-2">
            <label htmlFor="name" className="block text-sm font-medium mb-1">Gender</label>
            <input
              type="text"
              name="gender"
              value={values.gender}
              placeholder="Gender"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="dateOfBirth" className="block text-sm font-medium mb-1">DOB</label>
            <input
              type="text"
              name="dateOfBirth"
              value={values.dateOfBirth}
              placeholder="Full name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="specialty" className="block text-sm font-medium mb-1">specialty</label>
            <input
              type="text"
              name="specialty"
              value={values.specialty}
              placeholder="Full name"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
          </div>


          <div className="mb-2">
            <label htmlFor="qualifications" className="block text-sm font-medium mb-1">Qualifications</label>
            <input
              type="text"
              name="qualifications"
              value={values.qualifications}
              placeholder="qualifications"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.qualifications && <p className="text-red-500 text-sm mt-1">{errors.qualifications}</p>}
          </div>

          <div className="mb-2">
            <label htmlFor="medicalLicenseNumber" className="block text-sm font-medium mb-1">MedicalLicenseNumber</label>
            <input
              type="text"
              name="medicalLicenseNumber"
              value={values.medicalLicenseNumber}
              placeholder="MedicalLicenseNumber"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.medicalLicenseNumber && <p className="text-red-500 text-sm mt-1">{errors.medicalLicenseNumber}</p>}
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

          <div className="mb-2">
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium mb-1">yearsOfExperience</label>
            <input
              type="text"
              name="yearsOfExperience"
              value={values.yearsOfExperience}
              placeholder="yearsOfExperience"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleInput}
            />
            {errors.yearsOfExperience && <p className="text-red-500 text-sm mt-1">{errors.yearsOfExperience}</p>}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
           {loading? 'Registering...' : 'Register'}
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

export default DoctorRegister;
