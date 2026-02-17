import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true
});

export const registerUser = (data) => API.post('/api/user/register', data);
export const loginUser = (data) => API.post('/api/user/login', data);
