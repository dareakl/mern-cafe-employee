import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CafeTable from "./CafeTable";
import { BrowserRouter as Router } from "react-router-dom";

const mockCafes = [
  {
    _id: "1",
    logo: "https://example.com/logo1.png",
    name: "Cafe One",
    description: "A cozy place.",
    employees: 5,
    location: "Location One",
  },
  {
    _id: "2",
    logo: "https://example.com/logo2.png",
    name: "Cafe Two",
    description: "A great place to relax.",
    employees: 10,
    location: "Location Two",
  },
];

describe("CafeTable", () => {
  const handleDeleteMock = jest.fn();

  beforeEach(() => {
    render(
      <Router>
        <CafeTable cafes={mockCafes} onDelete={handleDeleteMock} />
      </Router>
    );
  });

  it("renders the cafe data", () => {
    expect(screen.getByText("Cafe One")).toBeInTheDocument();
    expect(screen.getByText("Cafe Two")).toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", () => {
    window.confirm = jest.fn(() => true); // Mock window.confirm to always return true

    const deleteButton = screen.getAllByText("Delete")[0];
    fireEvent.click(deleteButton);

    expect(handleDeleteMock).toHaveBeenCalledWith("1");
  });

  it("navigates to edit page when edit button is clicked", () => {
    const editButton = screen.getAllByText("Edit")[0];
    fireEvent.click(editButton);

    expect(window.location.pathname).toBe("/cafes/edit/1"); // Ensure it navigates correctly
  });
});
