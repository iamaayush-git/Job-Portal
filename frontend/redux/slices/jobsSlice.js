import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "job",
  initialState: {
    jobs: [],
    savedJobs: [],
    recommendJobs: []
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload
    },
    setRecommendedJobs: (state, action) => {
      state.recommendJobs = action.payload
    }
  }
})

export const { setJobs, setSavedJobs, setRecommendedJobs } = jobsSlice.actions;
export default jobsSlice.reducer;