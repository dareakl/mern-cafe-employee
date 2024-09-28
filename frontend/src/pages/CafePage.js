import React from "react";
import { Link } from "react-router-dom";
import CafeTable from "../components/CafeTable";

const CafePage = () => {
  return (
    <div>
      <h1>Cafes</h1>
      <Link to="/cafes/add">Add New Cafe</Link>
      <CafeTable />
    </div>
  );
};

export default CafePage;
