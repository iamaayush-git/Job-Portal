import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    user: null
  },
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true
      state.user = action.payload;
    }
  }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;