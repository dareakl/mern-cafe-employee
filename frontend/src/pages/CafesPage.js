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
  const [successMessage, setSuccessMessage] = useState("");

  const { data: cafes = [], refetch, isLoading, isError, error } = useQuery({
    queryKey: ["cafes", locationFilter],
    queryFn: () => fetchCafes(locationFilter),
    retry: false, // Disable automatic retries to handle errors manually
  });

  const mutation = useMutation({
    mutationFn: (id) => deleteCafe(id),
    onSuccess: () => {
      refetch();
      setSuccessMessage("Café deleted successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <CircularProgress />;

  // Enhanced error handling
  if (isError) {
    return (
      <Container>
        <Alert severity="error">
          Error fetching cafés: {error.message}.Please check if the backend
          server is running.
          <Button
            onClick={refetch}
            color="primary"
            style={{ marginLeft: "10px" }}
          >
            Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cafés
      </Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
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
        <CafeTable cafes={cafes} onDelete={handleDelete} />
      </Box>

      {successMessage && <Alert severity="success">{successMessage}</Alert>}
    </Container>
  );
};

export default CafesPage;
