import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage"; // Adjust the import based on your structure

// Mocking the navigate function
const MockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => MockNavigate,
}));

describe("HomePage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
  });

  test("renders without crashing", () => {
    expect(
      screen.getByText(/Welcome to the Cafe Employee Application/i)
    ).toBeInTheDocument();
  });

  test("displays the correct welcome message", () => {
    expect(
      screen.getByText(/Manage your cafes and employees efficiently/i)
    ).toBeInTheDocument();
  });

  test("renders 'Go to Cafés' button", () => {
    const cafesButton = screen.getByRole("button", { name: /Go to Cafés/i });
    expect(cafesButton).toBeInTheDocument();
  });

  test("renders 'Go to Employees' button", () => {
    const employeesButton = screen.getByRole("button", {
      name: /Go to Employees/i,
    });
    expect(employeesButton).toBeInTheDocument();
  });

  test("navigates to the Cafés page when 'Go to Cafés' is clicked", () => {
    const cafesButton = screen.getByRole("button", { name: /Go to Cafés/i });
    fireEvent.click(cafesButton);
    expect(MockNavigate).toHaveBeenCalledWith("/cafes");
  });

  test("navigates to the Employees page when 'Go to Employees' is clicked", () => {
    const employeesButton = screen.getByRole("button", {
      name: /Go to Employees/i,
    });
    fireEvent.click(employeesButton);
    expect(MockNavigate).toHaveBeenCalledWith("/employees");
  });
});
