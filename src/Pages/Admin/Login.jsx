import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/auththunk";
import Image from "../../assets/doctor.png";
import Image2 from "../../assets/tet.png";

const roles = ["Admin", "Doctor", "Receptionist"];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth)

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!selectedRole) {
      alert('Please select a role.');
      return;
    }
  
    try {
      const user = await dispatch(loginUser({ username, password})).unwrap();
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      navigate("/home");
    } catch (err) {
      console.error('Login Error:', err);
      const errorMessage = typeof err === 'string' ? err : err?.message || "Invalid credentials";
      alert("Login failed: " + errorMessage);
    }
  };
  
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex w-full max-w-5xl bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Left Image Section */}
        <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-4">
          <img
            src={Image}
            alt="Doctors illustration"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Sign in to Doctor-APP
          </h2>

          <form onSubmit={handleLogin}>
            {/* Role Dropdown */}
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            {!selectedRole && (
              <div className="hidden md:flex w-1/2 bg-white items-center justify-center p-4">
                <img
                  src={Image2}
                  alt="Secondary illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            )}

            {selectedRole && (
              <>
                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="w-1/2 mb-3 text-sm text-end">
                  <Link
                    to="/forgot-password"
                    className="text-blue-600hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                >
                  {loading ? "Signing in..." : `Login as ${selectedRole}`}
                </button>
              </>
            )}
          </form>

          {error && (
            <p className="text-sm text-center text-red-500 mt-2">{error?.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
