import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

// EmployeeTable component displays a table of employee data
// Props:
// - employees: Array of employee objects to be displayed
// - onDelete: Function to call when an employee is deleted
const EmployeeTable = ({ employees, onDelete }) => {
  const navigate = useNavigate();
  // Column definitions for the AgGrid table
  const columnDefs = [
    { headerName: "Employee ID", field: "id", sortable: true },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Email Address", field: "email_address", sortable: true },
    { headerName: "Phone Number", field: "phone_number", sortable: true },
    { headerName: "Days Worked", field: "days_worked", sortable: true },
    { headerName: "Café Name", field: "cafe", sortable: true },
    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => {
        return (
          <div>
            <Button
              variant="outlined"
              onClick={() => navigate(`/employees/edit/${params.data._id}`)} // Navigate to edit
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleDelete(params.data._id)} // Call handleDelete
              style={{ marginLeft: "10px" }}
            >
              Delete
            </Button>
          </div>
        );
      },
    },
  ];
  // Handles employee deletion with confirmation
  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmed) {
      onDelete(id); // Call onDelete only if confirmed
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      {employees.length === 0 ? (
        <p>No employees to display.</p>
      ) : (
        <AgGridReact
          rowData={employees}
          columnDefs={columnDefs}
          pagination={true}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
        />
      )}
    </div>
  );
};

export default EmployeeTable;
