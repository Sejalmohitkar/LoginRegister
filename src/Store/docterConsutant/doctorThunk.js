// doctorThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// consultant register
export const registerDoctor = createAsyncThunk(
  "auth/registerDoctor",
  async (credentials, { rejectWithValue }) => {
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.post("http://localhost:8000/doctor/register",
        credentials,
        {
          headers: {
            Authorization: adminToken
          }
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
      const response = await axios.post("http://localhost:8000/doctor/login", doctorData);
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
        `http://localhost:8000/admin/updateconsultant/${id}`,
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
    const adminToken = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      const response = await axios.delete(`http://localhost:8000/admin/deleteConsultant/${doctorId}`, {
        headers: {
          Authorization: adminToken
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete failed");
    }
  }
);

//Get All Patients
// export const getallPatient = createAsyncThunk("auth/getallPatient",async(_,{rejectWithValue})=>{
//   try{
//     const user =JSON.parse(localStorage.getItem('currentUser'));
//     const token =user?.token;
    
//     const response =await axios.get("http://localhost:8000/admin/getallpatient",{
//                 headers:{
//                   Authorization:token
//                 }
//     });
//     console.log("thunk data patient:",response.data.data);
    
//     return response.data.data
//   }catch(err){
//            return rejectWithValue(err.response?.data?.message || "Failed to get data")
//   }
// })

// Get All Receptionist 
export const getallreception = createAsyncThunk("auth/getallreception",async(_,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem('currentUser'));  
    const token = user?.token;

    const response =await axios.get("http://localhost:8000/admin/allreceptionist",{
           headers:{
            Authorization:token
           }
    })
    console.log(response.data.data);
    
    return response.data.data
  }catch(err){
    return rejectWithValue(err.response?.data?.message || "Failed to get data")
  }
})

 //create reception list
 export const registerReception =createAsyncThunk("auth/registerReception",async(formData,{rejectWithValue})=>{
  try{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token=user?.token;
    const response=await axios.post("http://localhost:8000/admin/registerreceptionist",formData,{
      headers:{
        Authorization:token
      }
    });
    console.log(response.data.data);
    
    return response.data.data;
  }catch(err){
    return rejectWithValue(err.response?.data?.message || 'Registration failed');

  }
})

// Delete Reception Thunk
export const deleteReception = createAsyncThunk(
  "auth/deleteReception",
  async (id, { rejectWithValue }) => {
    const token = JSON.parse(localStorage.getItem("currentUser"))?.token;
    try {
      await axios.delete(`http://localhost:8000/admin/deletereceptionist/${id}`, {
        headers: { Authorization: token }
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
export const viewReception = createAsyncThunk("auth/viewReception",
  async(rID,{rejectWithValue}) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token;
    try{
      const response = await axios.get(`http://localhost:8000/admin/receptionistbyid/${rID}`, {
        headers:{
          Authorization: token
        }
      })
      console.log(response.data.data);
      return response.data.data
    }catch(err){
      const errorMessage = err.response?.data?.message || "'get data by id failed";
      return rejectWithValue(errorMessage);
    }
  }
)

//update Receptionist
export const updateReception = createAsyncThunk(
  "auth/updateReception",
  async ({ id, updatedData }, { rejectWithValue }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const token = user?.token; 
    try {
      const response = await axios.patch(
        `http://localhost:8000/admin/updatereceptionist/${id}`,
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

// Get All Paitent
export const getallpatient = createAsyncThunk("auth/getallpatient",async(_,{rejectWithValue}) => {
  try{
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = user?.token;
    const response = await axios.get("http://localhost:8000/admin/getallpatient", {
      headers:{
        Authorization:token
      }
    })
    console.log(response.data.data);
    return response.data.data;
  }catch(err){
    return rejectWithValue(err.response?.data?.message || "Failed to get data")
  }
})

