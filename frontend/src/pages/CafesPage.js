import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import CafeTable from "../components/CafeTable";
import { fetchCafes, deleteCafe } from "../utils/api";

const CafesPage = () => {
  const [locationFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const { data: cafes = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["cafes", locationFilter],
    queryFn: () => fetchCafes(locationFilter),
  });
  // Mutation for deleting a café
  const mutation = useMutation({
    mutationFn: (id) => deleteCafe(id),
    onSuccess: () => {
      refetch();
      setSuccessMessage("Café deleted successfully!"); // Set success message
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });
  // Handle deletion of a café
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <CircularProgress />;
  // Error handling
  if (isError)
    return (
      <Alert severity="error">Error fetching cafés: {error.message}</Alert>
    );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cafés
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        {" "}
        {/* Flexbox for alignment */}
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/cafes/edit")}
          >
            Add New Café
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => (window.location.href = "/employees/edit")}
          >
            Add New Employee
          </Button>
        </Box>
      </Box>
      <Box mt={2}>
        {" "}
        {/* Add margin top for the table */}
        <CafeTable cafes={cafes} onDelete={handleDelete} />
      </Box>

      {successMessage && (
        <Alert severity="success">
          {successMessage} {/* Conditionally render success message */}
        </Alert>
      )}
    </Container>
  );
};

export default CafesPage;
