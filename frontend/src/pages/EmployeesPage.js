//import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Container, Button, Typography } from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../utils/api";

const EmployeesPage = () => {
  const { data: employees, refetch } = useQuery("employees", fetchEmployees);

  const mutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      refetch(); // Refresh the employees list after deletion
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      mutation.mutate(id);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/edit-employee")}
      >
        Add New Employee
      </Button>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
    </Container>
  );
};

export default EmployeesPage;
