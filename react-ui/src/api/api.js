// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; // backend URL

export const get = async (endpoint) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`);
  return response.data;
};

export const put = async (endpoint, data) => {
  const response = await axios.put(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

export const post = async (endpoint, data) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, data);
  return response.data;
};

export const del = async (endpoint) => {
  const response = await axios.delete(`${BASE_URL}${endpoint}`);
  return response.data;
};
