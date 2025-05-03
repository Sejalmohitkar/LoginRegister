import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginDoctor } from "../../Store/docterConsutant/doctorThunk";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const doctorUser = await dispatch(loginDoctor({ username, password })).unwrap();
      localStorage.setItem("DoctorUser", JSON.stringify(doctorUser));
      console.log(doctorUser);
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err) {
      alert("Login failed: " + (err?.message || "Invalid credentials"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleLogin}>
          <h3 className="text-2xl font-semibold text-center mb-6">
            Login Form
          </h3>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              UserName
            </label>
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Enter first username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-gray-600">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Signing..." : "SignIn"}
          </button>

          <p className="text-sm text-right mt-4 text-gray-600">
            Forgot{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Password?
            </a>
            <Link
              to="/doctor/register"
              className="ml-2 text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
