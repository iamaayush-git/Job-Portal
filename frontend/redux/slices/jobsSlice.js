import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    savedJobs: []
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload
    }
  }
})

export const { setJobs, setSavedJobs } = jobsSlice.actions;
export default jobsSlice.reducer;