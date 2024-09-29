import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const CafeTable = ({ cafes, onDelete }) => {
  const columnDefs = [
    {
      headerName: "Logo",
      field: "logo",
      cellRenderer: (params) => (
        <img
          src={params.value}
          alt="Logo"
          style={{ width: "50px", height: "auto" }}
        />
      ),
      sortable: true,
    },
    { headerName: "Name", field: "name", sortable: true },
    { headerName: "Description", field: "description", sortable: true },
    { headerName: "Employees", field: "employees", sortable: true },
    { headerName: "Location", field: "location", sortable: true },
    {
      headerName: "Actions",
      cellRendererFramework: (params) => (
        <div>
          <Button
            variant="outlined"
            onClick={() =>
              (window.location.href = `/cafes/edit/${params.data.id}`)
            }
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.data.id)}
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this café?"
    );
    if (confirmed) {
      onDelete(id); // Call the onDelete function passed as a prop
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact rowData={cafes} columnDefs={columnDefs} pagination={true} />
    </div>
  );
};

export default CafeTable;
