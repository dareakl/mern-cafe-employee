import React from "react";
import { createBrowserRouter, RouterProvider } from "@tanstack/router";
import CafePage from "./pages/CafePage";
import EmployeePage from "./pages/EmployeePage";
import CafeForm from "./components/CafeForm";
import EmployeeForm from "./components/EmployeeForm";

const router = createBrowserRouter([
  {
    path: "/cafes",
    element: <CafePage />,
  },
  {
    path: "/cafes/add",
    element: <CafeForm />,
  },
  {
    path: "/cafes/edit/:id",
    element: <CafeForm />,
  },
  {
    path: "/employees",
    element: <EmployeePage />,
  },
  {
    path: "/employees/add",
    element: <EmployeeForm />,
  },
  {
    path: "/employees/edit/:id",
    element: <EmployeeForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
