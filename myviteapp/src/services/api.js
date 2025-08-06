import axios from "axios";

const API = axios.create({
    baseURL: "#"
});

export const registerUser = (data) => API.post('#', data);
export const loginUser = (data) => API.post('#', data);