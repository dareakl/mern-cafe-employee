import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { fetchCafes } from "../api";

const CafeTable = () => {
  const { data: cafes, isLoading } = useQuery("cafes", fetchCafes);

  const columns = [
    { field: "logo", headerName: "Logo", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "employees", headerName: "Employees", width: 130 },
    { field: "location", headerName: "Location", width: 130 },
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
        <DataGrid rows={cafes} columns={columns} pageSize={5} />
      )}
    </div>
  );
};

export default CafeTable;
