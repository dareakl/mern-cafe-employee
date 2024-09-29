import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

export const fetchCafes = async (location) => {
  const response = await axios.get(`${API_URL}/cafe`, { params: { location } });
  return response.data;
};

export const deleteCafe = async (id) => {
  await axios.delete(`${API_URL}/cafe/${id}`);
};

export const fetchEmployees = async () => {
  const response = await axios.get(`${API_URL}/employee`);
  return response.data;
};

export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/employee/${id}`);
};
