const API_URL = "http://localhost:4001"; // Update with your backend URL

export const fetchCafes = async () => {
  const response = await fetch(`${API_URL}/cafe`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchEmployees = async () => {
  const response = await fetch(`${API_URL}/employee`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchCafe = async (id) => {
  const response = await fetch(`${API_URL}/cafe/${id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const fetchEmployee = async (id) => {
  const response = await fetch(`${API_URL}/employee/${id}`);
  if (!response.ok) throw new Error("Network response was not ok");
  return response.json();
};

export const createCafe = async (cafe) => {
  const response = await fetch(`${API_URL}/cafe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cafe),
  });
  if (!response.ok) throw new Error("Failed to create cafe");
  return response.json();
};

export const updateCafe = async (cafe) => {
  const response = await fetch(`${API_URL}/cafe/${cafe.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cafe),
  });
  if (!response.ok) throw new Error("Failed to update cafe");
  return response.json();
};

export const createEmployee = async (employee) => {
  const response = await fetch(`${API_URL}/employee`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Failed to create employee");
  return response.json();
};

export const updateEmployee = async (employee) => {
  const response = await fetch(`${API_URL}/employee/${employee.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });
  if (!response.ok) throw new Error("Failed to update employee");
  return response.json();
};
