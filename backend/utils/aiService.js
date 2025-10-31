import axios from 'axios'

const AI_URL = process.env.AI_URL || "http://localhost:8000"
export const recommendJobs = async (resumeUrl, topK = 5) => {
  const response = await axios.post(`${AI_URL}/recommend`, { resume_url: resumeUrl, top_k: topK }
  )
  return response.data.recommended_jobs
}

export const embedJob = async (jobs) => {
  const response = await axios.post(`${AI_URL}/embed-job`, jobs)
  return response.data
}