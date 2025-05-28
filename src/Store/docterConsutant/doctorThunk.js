// doctorThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// consultant register
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (credentials, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.post(
        `${BASE_URL}/doctor/register`,
        credentials,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

//consultant login
export const loginDoctor = createAsyncThunk(
  "auth/loginDoctor",
  async (doctorData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/doctor/login`, doctorData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// edit/update consultant
export const updateDoctor = createAsyncThunk(
  "auth/updateDoctor",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/updateconsultant/${id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// Delete Doctor Thunk
export const deleteDoctor = createAsyncThunk(
  "auth/deleteDoctor",
  async (doctorId, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/deleteConsultant/${doctorId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

///ViewConsultant Data by Id
export const viewConsultant = createAsyncThunk(
  "auth/viewConsultant",
  async (cIN, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/consutantbyid/${cIN}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "'get data by cIN failed";
      return rejectWithValue(errorMessage);
    }
  }
);

// Get All Receptionist
export const getallreception = createAsyncThunk(
  "auth/getallreception",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(`${BASE_URL}/admin/allreceptionist`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//create reception list
export const registerReception = createAsyncThunk(
  "auth/registerReception",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        `${BASE_URL}/admin/registerreceptionist`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

// Delete Reception Thunk
export const deleteReception = createAsyncThunk(
  "auth/deleteReception",
  async (id, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      await axios.delete(`${BASE_URL}/admin/deletereceptionist/${id}`, {
        headers: { Authorization: token },
      });
      return id;
    } catch (error) {
      // Always pass string — cleaner
      const errorMessage = error.response?.data?.message || "Delete failed";
      return rejectWithValue(errorMessage);
    }
  }
);

//view Recptionist by Id
export const viewReception = createAsyncThunk(
  "auth/viewReception",
  async (rID, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/receptionistbyid/${rID}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "'get data by id failed";
      return rejectWithValue(errorMessage);
    }
  }
);

//update Receptionist
export const updateReception = createAsyncThunk(
  "auth/updateReception",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/updatereceptionist/${id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

// Get All Patients
export const getallPatient = createAsyncThunk(
  "auth/getallPatient",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(`${BASE_URL}/admin/getallpatient`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//create registerpatient
export const registerPatient = createAsyncThunk(
  "auth/registerPatient",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        `${BASE_URL}/admin/savepatient`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

//deletePatient Thunk
export const deletePatient = createAsyncThunk(
  "auth/deletePatient",
  async (id, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      await axios.delete(`${BASE_URL}/admin/deletepatient/${id}`, {
        headers: { Authorization: token },
      });
      return id;
    } catch (error) {
      // Always pass string — cleaner
      const errorMessage = error.response?.data?.message || "Delete failed";
      return rejectWithValue(errorMessage);
    }
  }
);

//view Patient by Id

export const viewPatient = createAsyncThunk(
  "auth/viewPatient",
  async (pIN, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(`${BASE_URL}/admin/getbypin/${pIN}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "'get data by id failed";
      return rejectWithValue(errorMessage);
    }
  }
);

//update Patient
export const updatePatients = createAsyncThunk(
  "auth/updatePatients",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/updatepatient/${id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

//get all Department
export const getallDepartment = createAsyncThunk(
  "auth/getallDepartment",
  async (_, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;

      const response = await axios.get(`${BASE_URL}/admin/alldepartment`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to get data"
      );
    }
  }
);

//create departments
export const registerDepartment = createAsyncThunk(
  "auth/registerDepartment",
  async (formData, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      const token = user?.token;
      const response = await axios.post(
        `${BASE_URL}/admin/createdepartment`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);

      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Registration failed"
      );
    }
  }
);

//delete departments
export const deleteDepartment = createAsyncThunk(
  "auth/deleteDepartment",
  async (_id, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(
        `${BASE_URL}/admin/deletedepartment/${_id}`,
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

//update Department
export const updateDepartment = createAsyncThunk(
  "auth/updateDepartment",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.patch(
        `${BASE_URL}/admin/updatedepartment/${id}`,
        updatedData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
  }
);

//view Department
export const viewDepartment = createAsyncThunk(
  "auth/viewDepartment",
  async (dIN, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try {
      const response = await axios.get(
        `${BASE_URL}/admin/departmentbyid/${dIN}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      return response.data.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "'get data by id failed";
      return rejectWithValue(errorMessage);
    }
  }
);
