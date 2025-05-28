import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, getConsultantData } from "../Store/auththunk";

const initialState = {
  user: null,
  consultant: [],
  token: null,
  loading: false,
  error: null,
};
// console.log("initialState", initialState)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;

      localStorage.removeItem("users");
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // Handle Registration
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     
      })

      //getConsultantData
      .addCase(getConsultantData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConsultantData.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.consultant = action.payload;
      })
      .addCase(getConsultantData.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
     
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;