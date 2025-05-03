import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import doctorReducer from './docterConsutant/doctorSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
  },
});

export default store;

