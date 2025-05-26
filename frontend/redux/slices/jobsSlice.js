import { createSlice } from "@reduxjs/toolkit";

const jobsSlice = createSlice({
  name: "job",
  initialState: {
    jobs: []
  },
  reducers: {
    setJobs: (state, action) => {
      state.jobs = action.payload;
    }
  }
})

export const { setJobs } = jobsSlice.actions;
export default jobsSlice.reducer;