import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EmployeeTable from "./EmployeeTable"; // Adjust the import path as necessary
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mocking useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("EmployeeTable Component", () => {
  const onDelete = jest.fn();
  const navigate = jest.fn(); // Mock navigate function

  beforeEach(() => {
    // Reset the mock before each test
    jest.clearAllMocks();
    useNavigate.mockReturnValue(navigate);
  });

  test("renders without crashing", () => {
    const employees = [
      {
        _id: "1",
        id: "101",
        name: "John Doe",
        email_address: "john@example.com",
        phone_number: "123-456-7890",
        days_worked: 5,
        cafe: "Cafe 1",
      },
      {
        _id: "2",
        id: "102",
        name: "Jane Smith",
        email_address: "jane@example.com",
        phone_number: "987-654-3210",
        days_worked: 10,
        cafe: "Cafe 2",
      },
    ];

    render(
      <MemoryRouter>
        <EmployeeTable employees={employees} onDelete={onDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
  });

  test("displays a message when there are no employees", () => {
    render(
      <MemoryRouter>
        <EmployeeTable employees={[]} onDelete={onDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText("No employees to display.")).toBeInTheDocument();
  });

  test("calls onDelete with the correct id when the Delete button is clicked", () => {
    const employees = [
      {
        _id: "1",
        id: "101",
        name: "John Doe",
        email_address: "john@example.com",
        phone_number: "123-456-7890",
        days_worked: 5,
        cafe: "Cafe 1",
      },
    ];

    // Mock window.confirm to simulate a confirmation
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(
      <MemoryRouter>
        <EmployeeTable employees={employees} onDelete={onDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    // Check that onDelete was called with the correct ID
    expect(onDelete).toHaveBeenCalledWith("1");

    // Restore the original confirm function
    window.confirm.mockRestore();
  });

  test("does not call onDelete when the Delete button is clicked and not confirmed", () => {
    const employees = [
      {
        _id: "1",
        id: "101",
        name: "John Doe",
        email_address: "john@example.com",
        phone_number: "123-456-7890",
        days_worked: 5,
        cafe: "Cafe 1",
      },
    ];

    // Mock window.confirm to simulate a cancellation
    jest.spyOn(window, "confirm").mockImplementation(() => false);

    render(
      <MemoryRouter>
        <EmployeeTable employees={employees} onDelete={onDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).not.toHaveBeenCalled();

    // Restore the original confirm function
    window.confirm.mockRestore();
  });

  test("navigates to the correct edit page when the Edit button is clicked", () => {
    const employees = [
      {
        _id: "1",
        id: "101",
        name: "John Doe",
        email_address: "john@example.com",
        phone_number: "123-456-7890",
        days_worked: 5,
        cafe: "Cafe 1",
      },
    ];

    render(
      <MemoryRouter>
        <EmployeeTable employees={employees} onDelete={onDelete} />
      </MemoryRouter>
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(navigate).toHaveBeenCalledWith("/employees/edit/1");
  });
});
