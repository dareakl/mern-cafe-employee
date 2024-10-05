import axios from "axios";
// Base URL for the API, defaulting to a local server if not specified in the environment
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";
// Function to fetch cafes with an optional location filter
export const fetchCafes = async (location) => {
  const response = await axios.get(`${API_URL}/cafe`, { params: { location } });
  return response.data;
};
// Function to delete a cafe by its ID
export const deleteCafe = async (id) => {
  await axios.delete(`${API_URL}/cafe/${id}`);
};
// Function to fetch all employees
export const fetchEmployees = async () => {
  const response = await axios.get(`${API_URL}/employee`);
  //console.log(response.data); // Log the response data
  return response.data;
};
// Function to delete an employee by their ID
export const deleteEmployee = async (id) => {
  await axios.delete(`${API_URL}/employee/${id}`);
};
