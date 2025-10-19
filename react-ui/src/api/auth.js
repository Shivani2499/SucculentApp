// src/api/auth.js
import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

export const registerUser = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const loginUser = async (userData) => {
  const res = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
    credentials: "include", // if your backend uses cookies
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || "Login failed");

  return data;
};
