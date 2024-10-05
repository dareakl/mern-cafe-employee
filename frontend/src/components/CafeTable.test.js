import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CafeTable from "./CafeTable"; // Adjust the import path as necessary
import { MemoryRouter, useNavigate } from "react-router-dom";

describe("CafeTable Component", () => {
  const onDelete = jest.fn();

  test("renders without crashing", () => {
    const cafes = [
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

    render(
      <MemoryRouter>
        <CafeTable cafes={cafes} onDelete={onDelete} />
      </MemoryRouter>
    );

    // Check for the presence of cafe names and descriptions
    expect(screen.getByText("Cafe 1")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Cafe 2")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  test("displays a message when there are no cafes", () => {
    render(
      <MemoryRouter>
        <CafeTable cafes={[]} onDelete={onDelete} />
      </MemoryRouter>
    );

    expect(screen.getByText("No rows to show.")).toBeInTheDocument();
  });

  test("calls onDelete with the correct id when the Delete button is clicked and confirmed", () => {
    const cafes = [
      {
        _id: "1",
        logo: "http://example.com/logo1.png",
        name: "Cafe 1",
        description: "Description 1",
        employees: 5,
        location: "Location 1",
      },
    ];

    // Mock window.confirm to simulate a confirmation
    jest.spyOn(window, "confirm").mockImplementation(() => true);

    render(
      <MemoryRouter>
        <CafeTable cafes={cafes} onDelete={onDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).toHaveBeenCalledWith("1");

    // Restore the original confirm function
    window.confirm.mockRestore();
  });
  test("does not call onDelete when the Delete button is clicked and not confirmed", () => {
    const cafes = [
      {
        _id: "1",
        logo: "http://example.com/logo1.png",
        name: "Cafe 1",
        description: "Description 1",
        employees: 5,
        location: "Location 1",
      },
    ];

    // Mock window.confirm to simulate a cancellation
    jest.spyOn(window, "confirm").mockImplementation(() => false);

    render(
      <MemoryRouter>
        <CafeTable cafes={cafes} onDelete={onDelete} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(onDelete).not.toHaveBeenCalled();

    // Restore the original confirm function
    window.confirm.mockRestore();
  });
});
