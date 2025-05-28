import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

// Login Thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/login`, credentials);
      console.log("thunkData", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Register Thunk
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/register`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

// consultantDataForDashboard
export const getConsultantData = createAsyncThunk(
  "auth/getConsultantData",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      console.log("token fo getData:", token);

      const response = await axios.get(`${BASE_URL}/admin/getallconsultant`, {
        headers: {
          Authorization: token,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
