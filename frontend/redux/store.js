import { configureStore } from "@reduxjs/toolkit"
import loadingSlice from "../redux/slices/loadingSlice.js"
import authSlice from "../redux/slices/authSlice.js"

const store = configureStore({
  reducer: {
    loading: loadingSlice,
    auth: authSlice
  }
})

export default store;