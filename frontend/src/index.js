import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store"; // Import your store
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CafesPage from "./pages/CafesPage";
import EmployeesPage from "./pages/EmployeesPage";
import EditCafePage from "./pages/EditCafePage";
import EditEmployeePage from "./pages/EditEmployeePage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Wrap your app with Provider */}
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cafes" element={<CafesPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/cafes/edit/:id?" element={<EditCafePage />} />
          <Route path="/employees/edit/:id?" element={<EditEmployeePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </Provider>
);
