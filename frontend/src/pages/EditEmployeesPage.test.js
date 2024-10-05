import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditEmployeePage from "./EditEmployeePage"; // Adjust the import path as necessary
import axios from "axios";

// Mock axios
jest.mock("axios");

const mockStore = configureStore([]);
const queryClient = new QueryClient();

describe("EditEmployeePage", () => {
  const setup = (employeeData = {}, cafesData = []) => {
    axios.get.mockImplementation((url) => {
      console.log("Fetching URL:", url); // Log the URL being fetched
      if (url.includes("/employee/")) {
        return Promise.resolve({ data: employeeData });
      }
      if (url.includes("/cafe")) {
        return Promise.resolve({ data: cafesData });
      }
      return Promise.reject(new Error("Not Found"));
    });

    const store = mockStore({});
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <EditEmployeePage />
          </Router>
        </QueryClientProvider>
      </Provider>
    );
  };

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  // Test Case 1: Render Title Based on `id`
  it("displays the correct title when editing an employee", async () => {
    setup(
      {
        id: "1",
        name: "John Doe",
        email_address: "john.doe@example.com",
        phone_number: "91234567",
        gender: "Male",
        cafeId: "1",
        start_date: "2024-10-01",
      },
      [
        { id: "1", name: "Cafe 1" },
        { id: "2", name: "Cafe 2" },
      ]
    );

    expect(await screen.findByText(/edit employee/i)).toBeInTheDocument();
  });

  // Test Case 2: Render Form Fields
  it("renders form fields correctly", async () => {
    setup(
      {
        id: "1",
        name: "John Doe",
        email_address: "john.doe@example.com",
        phone_number: "91234567",
        gender: "Male",
        cafeId: "1",
        start_date: "2024-10-01",
      },
      [
        { id: "1", name: "Cafe 1" },
        { id: "2", name: "Cafe 2" },
      ]
    );

    expect(await screen.findByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/male/i)).toBeInTheDocument();
  });

  // Test Case 3: Cancel Button Functionality
  it("navigates to employees on cancel", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    setup(
      {
        id: "1",
        name: "John Doe",
        email_address: "john.doe@example.com",
        phone_number: "91234567",
        gender: "Male",
        cafeId: "1",
        start_date: "2024-10-01",
      },
      [
        { id: "1", name: "Cafe 1" },
        { id: "2", name: "Cafe 2" },
      ]
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/employees");
    });
  });

  // Test Case 4: Form Submission
  it("submits the form data correctly", async () => {
    setup(
      {
        id: "1",
        name: "John Doe",
        email_address: "john.doe@example.com",
        phone_number: "91234567",
        gender: "Male",
        cafeId: "1",
        start_date: "2024-10-01",
      },
      [
        { id: "1", name: "Cafe 1" },
        { id: "2", name: "Cafe 2" },
      ]
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Jane Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "jane.smith@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "81234567" },
    });
    fireEvent.click(screen.getByLabelText(/female/i)); // Assuming 'Female' radio is selected

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "http://localhost:4001/employee/1",
        expect.objectContaining({
          name: "Jane Smith",
          email_address: "jane.smith@example.com",
          phone_number: "81234567",
          gender: "Female",
          cafeId: "1",
        })
      );
    });
  });
});
