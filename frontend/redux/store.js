import { configureStore } from "@reduxjs/toolkit"
import loadingSlice from "../redux/slices/loadingSlice.js"

const store = configureStore({
  reducer: {
    loading: loadingSlice
  }
})

export default store;