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
    },
    removeUser: (state, action) => {
      state.isLoggedIn = false,
        state.user = null
    }
  }
})

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;