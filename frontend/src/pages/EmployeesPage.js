// import React from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { Container, Button, Typography } from "@mui/material";
// import EmployeeTable from "../components/EmployeeTable";
// import { fetchEmployees, deleteEmployee } from "../utils/api";

// const EmployeesPage = () => {
//   // Update useQuery to use the object syntax
//   const { data: employees, refetch } = useQuery({
//     queryKey: ["employees"],
//     queryFn: fetchEmployees,
//   });

//   const mutation = useMutation({
//     mutationFn: (id) => deleteEmployee(id),
//     onSuccess: () => {
//       refetch(); // Refresh the employees list after deletion
//     },
//   });

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this employee?")) {
//       mutation.mutate(id);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Employees
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => (window.location.href = "/employees/edit")}
//       >
//         Add New Employee
//       </Button>
//       <EmployeeTable employees={employees} onDelete={handleDelete} />
//     </Container>
//   );
// };

// export default EmployeesPage;

import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import EmployeeTable from "../components/EmployeeTable";
import { fetchEmployees, deleteEmployee } from "../utils/api";
import { useNavigate } from "react-router-dom";

const EmployeesPage = () => {
  const navigate = useNavigate();

  // Fetch employees
  const { data: employees, refetch, isLoading, isError, error } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  // Verify if employees have the expected structure
  //console.log(employees);

  const mutation = useMutation({
    mutationFn: (id) => deleteEmployee(id),
    onSuccess: () => {
      refetch(); // Refresh the employees list after deletion
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      mutation.mutate(id); // Call the mutation to delete the employee
    }
  };

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Alert severity="error">
          Error fetching employees: {error.message}. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Employees
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/employees/edit")}
      >
        Add New Employee
      </Button>
      <EmployeeTable employees={employees} onDelete={handleDelete} />
      {mutation.isLoading && <CircularProgress />}{" "}
      {/* Show loading spinner when deleting */}
      {mutation.isError && (
        <Alert severity="error">
          Error deleting employee: {mutation.error.message}
        </Alert>
      )}
      {mutation.isSuccess && (
        <Alert severity="success">Employee deleted successfully!</Alert>
      )}
    </Container>
  );
};

export default EmployeesPage;
