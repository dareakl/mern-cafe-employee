import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditCafePage from "./EditCafePage";
import * as api from "../utils/api"; // Adjust the path as necessary

// Mock the entire api module
jest.mock("../utils/api");

const queryClient = new QueryClient();

describe("EditCafePage", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Mock the fetchCafe to resolve with sample data
    api.fetchCafe.mockResolvedValueOnce({
      _id: "1",
      name: "Cafe One",
      description: "A cozy place.",
      logo: "http://example.com/logo.png",
      location: "Downtown",
    });
  });

  test("displays the fetched cafe details", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <EditCafePage />
      </QueryClientProvider>
    );

    // Check if the cafe details are displayed
    expect(await screen.findByLabelText(/name/i)).toHaveValue("Cafe One");
    expect(screen.getByLabelText(/description/i)).toHaveValue("A cozy place.");
    expect(screen.getByLabelText(/location/i)).toHaveValue("Downtown");
  });

  test("displays an error message if submission fails", async () => {
    // Mock a failed submission
    api.updateCafe = jest
      .fn()
      .mockRejectedValueOnce(new Error("Submission failed"));

    render(
      <QueryClientProvider client={queryClient}>
        <EditCafePage />
      </QueryClientProvider>
    );

    // Simulate user actions to trigger submission
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Cafe One" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A cozy place." },
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: "Downtown" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    // Check for the error message
    await waitFor(() =>
      expect(screen.getByText(/error saving café/i)).toBeInTheDocument()
    );
  });

  test("redirects to cafes page after successful submission", async () => {
    // Mock a successful update
    api.updateCafe = jest.fn().mockResolvedValueOnce({});

    render(
      <QueryClientProvider client={queryClient}>
        <EditCafePage />
      </QueryClientProvider>
    );

    // Simulate user actions to trigger submission
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Cafe One" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "A cozy place." },
    });
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: "Downtown" },
    });

    fireEvent.click(screen.getByText(/submit/i));

    // Check that the navigate function was called to redirect
    await waitFor(() => expect(window.location.pathname).toBe("/cafes"));
  });
});
