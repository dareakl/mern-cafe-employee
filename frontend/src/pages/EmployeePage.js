import React from "react";
import { Link } from "react-router-dom";
import EmployeeTable from "../components/EmployeeTable";

const EmployeePage = () => {
  return (
    <div>
      <h1>Employees</h1>
      <Link to="/employees/add">Add New Employee</Link>
      <EmployeeTable />
    </div>
  );
};

export default EmployeePage;
