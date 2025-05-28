import { createSlice } from "@reduxjs/toolkit";
import {
  loginDoctor,
  registerDoctor,
  updateDoctor,
  viewConsultant,
  getallreception,
  registerReception,
  deleteReception,
  viewReception,
  updateReception,
  getallPatient,
  registerPatient,
  updatePatients,
  deletePatient,
  viewPatient,
  getallDepartment,
  registerDepartment,
  deleteDepartment,
  updateDepartment,
  viewDepartment,
} from "../docterConsutant/doctorThunk";

const initialState = {
  user: null, // For doctor data (single user)
  token: null,
  loading: false,
  error: null,
  ConsultantById: [],
  Reception: [],
  RecetionById: [],
  Patient: [],
  PatientById: [],
  department: [],
  DepartmentdIN: [],
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

      //view consultant data
      .addCase(viewConsultant.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewConsultant.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.ConsultantById = action.payload;
      })
      .addCase(viewConsultant.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.error.message; 
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

      //getallPatient
      .addCase(getallPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallPatient.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.Patient = action.payload);
      })
      .addCase(getallPatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      // create registerPatient
      .addCase(registerPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerPatient.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.user = action.payload);
      })
      .addCase(registerPatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //delete Patient
      .addCase(deletePatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.Patient = state.Patient.filter(
          (patients) => patients.id !== action.payload
        );
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      //update Patients
      .addCase(updatePatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePatients.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updatePatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // view Patient by id

      .addCase(viewPatient.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewPatient.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.PatientById = action.payload;
      })
      .addCase(viewPatient.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //get all departments
      .addCase(getallDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallDepartment.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.department = action.payload);
      })
      .addCase(getallDepartment.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.error.message);
      })

      //create departments
      .addCase(registerDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerDepartment.fulfilled, (state, action) => {
        (state.status = "succeeded"), (state.department = action.payload);
      })
      .addCase(registerDepartment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })

      //delete department
      .addCase(deleteDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.department = state.department.filter(
          (departments) => departments.id !== action.payload
        );
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      //update Department
      .addCase(updateDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // view Patient by id
      .addCase(viewDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(viewDepartment.fulfilled, (state, action) => {
        state.status = "Succeeded";
        state.DepartmentdIN = action.payload;
      })
      .addCase(viewDepartment.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
