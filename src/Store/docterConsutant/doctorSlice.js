import { createSlice } from "@reduxjs/toolkit";
import { loginDoctor, registerDoctor } from "../docterConsutant/doctorThunk";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

console.log("initialState", initialState)
const authSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
    },
  },
  
  extraReducers: (builder) => {
    builder
      // Handle Login
      .addCase(loginDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        
      })

      // Handle Registration
      .addCase(registerDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        
      })
      .addCase(registerDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
     
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;