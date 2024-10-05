import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CafesPage from "./CafesPage"; // Adjust the import path as necessary
import { useQuery, useMutation } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchCafes, deleteCafe } from "../utils/api";
import { MemoryRouter } from "react-router-dom";
import * as router from "react-router-dom";
import * as api from "../utils/api"; // Import your API module
import { useNavigate } from "react-router-dom";

// Mock the API functions
jest.mock("../utils/api");
const queryClient = new QueryClient();

describe("CafesPage Component", () => {
  const cafesMock = [
    {
      _id: "1",
      logo: "http://example.com/logo1.png",
      name: "Cafe 1",
      description: "Description 1",
      employees: 5,
      location: "Location 1",
    },
    {
      _id: "2",
      logo: "http://example.com/logo2.png",
      name: "Cafe 2",
      description: "Description 2",
      employees: 10,
      location: "Location 2",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders without crashing", () => {
    fetchCafes.mockResolvedValueOnce([]); // Mocking fetchCafes to return an empty array
    render(
      <QueryClientProvider client={queryClient}>
        <CafesPage />
      </QueryClientProvider>
    );
  });
  test("renders the CafeTable with fetched cafes", async () => {
    fetchCafes.mockResolvedValueOnce(cafesMock); // Mocking fetchCafes to return cafesMock
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <CafesPage />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText("Cafe 1")).toBeInTheDocument());
    expect(screen.getByText("Cafe 2")).toBeInTheDocument();
  });

  test("renders the CafeTable with fetched cafes", async () => {
    // Mock implementation for fetchCafes here...
  });
});
