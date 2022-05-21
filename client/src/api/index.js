import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export const fetchJobs = (
  jobName,
  companyName,
  jobLocation,
  technologies,
  sort,
  page,
  limit
) =>
  API.get(
    `/jobs?jobName=${jobName}&companyName=${companyName}&jobLocation=${jobLocation}&technologies=${technologies}&sort=${sort}&page=${page}&limit=${limit}`
  );
export const fetchOneJob = (id) => API.get(`/jobs/${id}`);
export const createJob = (newJob) => API.post("/jobs", newJob);
export const updateJob = (id, updatedJob) =>
  API.patch(`/jobs/${id}`, updatedJob);
export const likeJob = (id) => API.patch(`/jobs/${id}/likeJob`);
export const deleteJob = (id) => API.delete(`/jobs/${id}`);

export const register = (newUser) => API.post("/users/register", newUser);
export const login = (existingUser) => API.post("/users/login", existingUser);
