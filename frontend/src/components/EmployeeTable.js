import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const EmployeeTable = ({ employees, onDelete }) => {
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
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            onClick={() =>
              (window.location.href = `/edit-employee/${params.value}`)
            }
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(params.value)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        rowData={employees}
        columnDefs={columnDefs}
        pagination={true}
      />
    </div>
  );
};

export default EmployeeTable;
