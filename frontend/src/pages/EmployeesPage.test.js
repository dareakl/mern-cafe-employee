import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import EmployeesPage from "./EmployeesPage"; // Adjust the import path as necessary
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import * as api from "../utils/api"; // Import your API module

// Mock the API functions
jest.mock("../utils/api");
const queryClient = new QueryClient();

describe("EmployeesPage Component", () => {
  const employeesMock = [
    {
      _id: "1",
      name: "Employee 1",
      position: "Developer",
    },
    {
      _id: "2",
      name: "Employee 2",
      position: "Manager",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    api.fetchEmployees.mockResolvedValueOnce([]); // Mocking fetchEmployees to return an empty array
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeesPage />
        </MemoryRouter>
      </QueryClientProvider>
    );
  });

  test("renders the EmployeeTable with fetched employees", async () => {
    api.fetchEmployees.mockResolvedValueOnce(employeesMock); // Mocking fetchEmployees to return employeesMock
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <EmployeesPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() =>
      expect(screen.getByText("Employee 1")).toBeInTheDocument()
    );
    expect(screen.getByText("Employee 2")).toBeInTheDocument();
  });
});
