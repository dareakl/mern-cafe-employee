import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api";

const EmployeeTable = () => {
  const { data: employees, isLoading } = useQuery("employees", fetchEmployees);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email_address", headerName: "Email Address", width: 200 },
    { field: "phone_number", headerName: "Phone Number", width: 150 },
    { field: "days_worked", headerName: "Days Worked", width: 150 },
    { field: "cafe", headerName: "Café", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => <div>{/* Add Edit and Delete buttons */}</div>,
      width: 150,
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataGrid rows={employees} columns={columns} pageSize={5} />
      )}
    </div>
  );
};

export default EmployeeTable;
