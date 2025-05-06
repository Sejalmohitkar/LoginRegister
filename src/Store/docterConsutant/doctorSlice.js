import { createSlice } from "@reduxjs/toolkit";
import {
  loginDoctor,
  registerDoctor,
  updateDoctor,
  getallreception,
  registerReception,
  deleteReception,
  viewReception,
  updateReception,
  getallpatient,
} from "../docterConsutant/doctorThunk";


const initialState = {
  user: null, // For doctor data (single user)
  token: null,
  loading: false,
  error: null,
  Reception: [],
  RecetionById: [],
  Patients: [],
};

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
      })

      // Handle doctor update
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDoctor.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getallreceptionsit
      .addCase(getallreception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallreception.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Reception = action.payload);
      })
      .addCase(getallreception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // create Reception
      .addCase(registerReception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerReception.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(registerReception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //delete Receptionist
      .addCase(deleteReception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteReception.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Reception = state.Reception.filter(
          (receptionist) => receptionist.id !== action.payload
        );
      })
      .addCase(deleteReception.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      //view receptionist by id
      .addCase(viewReception.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewReception.fulfilled, (state, action) => {
        (state.status = "Succeeded"), (state.RecetionById = action.payload);
      })
      .addCase(viewReception.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //update Receptionist
      .addCase(updateReception.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateReception.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateReception.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //getPatientData
      .addCase(getallpatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallpatient.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Patients = action.payload);
      })
      .addCase(getallpatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
