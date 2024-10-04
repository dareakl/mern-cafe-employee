// import React from "react";
// import { AgGridReact } from "ag-grid-react";
// import { Button } from "@mui/material";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// const CafeTable = ({ cafes, onDelete }) => {
//   const navigate = useNavigate(); // Initialize navigate

//   const columnDefs = [
//     {
//       headerName: "Logo",
//       field: "logo",
//       cellRenderer: (params) => (
//         <img
//           src={params.value}
//           alt="Logo"
//           style={{ width: "50px", height: "auto" }}
//         />
//       ),
//       sortable: true,
//       filter: true,
//     },
//     { headerName: "Name", field: "name", sortable: true, filter: true },
//     {
//       headerName: "Description",
//       field: "description",
//       sortable: true,
//       filter: true,
//     },
//     {
//       headerName: "Employees",
//       field: "employees",
//       sortable: true,
//       filter: true,
//     },
//     { headerName: "Location", field: "location", sortable: true, filter: true },
//     {
//       headerName: "Actions",
//       cellRenderer: (params) => (
//         <div>
//           <Button
//             variant="outlined"
//             onClick={() => navigate(`/cafes/edit/${params.data._id}`)} // Use navigate for editing
//             style={{ marginRight: "10px" }}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="outlined"
//             color="error"
//             onClick={() => handleDelete(params.data._id)} // Call handleDelete
//           >
//             Delete
//           </Button>
//         </div>
//       ),
//     },
//   ];

//   const handleDelete = (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this café?"
//     );
//     if (confirmed) {
//       onDelete(id); // Call the onDelete function passed as a prop
//     }
//   };

//   return (
//     <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
//       <AgGridReact
//         rowData={cafes}
//         columnDefs={columnDefs}
//         pagination={true}
//         domLayout="autoHeight" // This allows the grid to adjust height based on rows
//         defaultColDef={{
//           sortable: true,
//           filter: true,
//           resizable: true,
//         }}
//       />
//     </div>
//   );
// };

// export default CafeTable;

// components/CafeTable.js

import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Button } from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useNavigate } from "react-router-dom";

const CafeTable = ({ cafes, onDelete }) => {
  const navigate = useNavigate();

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
      filter: true,
    },
    { headerName: "Name", field: "name", sortable: true, filter: true },
    {
      headerName: "Description",
      field: "description",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Employees",
      field: "employees",
      sortable: true,
      filter: true,
    },
    { headerName: "Location", field: "location", sortable: true, filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div>
          <Button
            variant="outlined"
            onClick={() => navigate(`/cafes/edit/${params.data._id}`)}
            style={{ marginRight: "10px" }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(params.data._id)}
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
      onDelete(id);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
      <AgGridReact
        rowData={cafes}
        columnDefs={columnDefs}
        pagination={true}
        // domLayout="autoHeight"
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        overlayNoRowsTemplate='<span style="padding: 10px;">No rows to show.</span>' // Custom message for empty rows
      />
    </div>
  );
};

export default CafeTable;
