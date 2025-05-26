import { configureStore } from "@reduxjs/toolkit"
import loadingSlice from "../redux/slices/loadingSlice.js"
import authSlice from "../redux/slices/authSlice.js"
import jobsSlice from "../redux/slices/jobsSlice.js"

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice,
    job: jobsSlice
  }
})

export default store;