import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CafesPage from "./CafesPage";
import * as api from "../utils/api";

jest.mock("../utils/api");

const queryClient = new QueryClient();

describe("CafesPage", () => {
  beforeEach(() => {
    api.fetchCafes.mockResolvedValueOnce([
      { _id: "1", name: "Cafe One" },
      { _id: "2", name: "Cafe Two" },
    ]);
    render(
      <QueryClientProvider client={queryClient}>
        <CafesPage />
      </QueryClientProvider>
    );
  });

  it("renders loading indicator initially", () => {
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("displays cafes after loading", async () => {
    await waitFor(() => {
      expect(screen.getByText("Cafe One")).toBeInTheDocument();
      expect(screen.getByText("Cafe Two")).toBeInTheDocument();
    });
  });

  it("calls delete function when delete button is clicked", async () => {
    api.deleteCafe.mockResolvedValueOnce();

    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Delete")[0]);
    });

    expect(api.deleteCafe).toHaveBeenCalledWith("1");
  });

  it("displays success message after successful deletion", async () => {
    api.deleteCafe.mockResolvedValueOnce();
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Delete")[0]);
    });

    expect(
      await screen.findByText("Café deleted successfully!")
    ).toBeInTheDocument();
  });
});
