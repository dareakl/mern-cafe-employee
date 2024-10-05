import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditCafePage from "./EditCafePage"; // Adjust the import path as necessary
import axios from "axios";

// Mock axios
jest.mock("axios");

const mockStore = configureStore([]);
const queryClient = new QueryClient();

describe("EditCafePage", () => {
  // Test Case 1: Render Title Based on `id`
  it("displays the correct title based on id", () => {
    const store = mockStore({});
    // Set up your mock for the fetching function as needed here.

    // Assuming you are simulating the 'edit' state
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <EditCafePage />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText(/Add New Café/i)).toBeInTheDocument(); // Test for no id case
  });

  // Test Case 2: Render Form Fields
  it("renders form fields correctly", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <EditCafePage />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Location/i)).toBeInTheDocument();
  });

  // Test Case 3: Cancel Button Functionality
  it("navigates to cafes on cancel", () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <EditCafePage />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Cancel/i));
    // Verify navigation logic here based on your router setup
  });
});
