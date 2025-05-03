import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Login Thunk
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (credentials, { rejectWithValue }) => {
    const adminToken = localStorage.getItem("currentUser");
    try {
      const response = await axios.post("http://localhost:8000/doctor/register",
      credentials,
      {
        headers:{
            Authorization:  adminToken
        }
      }
    );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// Login Thunk
export const loginDoctor = createAsyncThunk(
  "auth/loginDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:8000/doctor/login", doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);