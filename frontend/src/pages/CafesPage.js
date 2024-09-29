import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Container, Button, TextField, Typography } from "@mui/material";
import CafeTable from "../components/CafeTable";
import { fetchCafes, deleteCafe } from "../utils/api";

const CafesPage = () => {
  const [locationFilter, setLocationFilter] = useState("");

  const { data: cafes, refetch } = useQuery({
    queryKey: ["cafes", locationFilter],
    queryFn: () => fetchCafes(locationFilter),
  });

  const mutation = useMutation({
    mutationFn: (id) => deleteCafe(id),
    onSuccess: () => {
      refetch(); // Refresh the cafes list after deletion
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      mutation.mutate(id);
    }
  };

  const handleFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cafés
      </Typography>
      <TextField
        label="Filter by Location"
        value={locationFilter}
        onChange={handleFilterChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/cafes/edit")}
      >
        Add New Café
      </Button>
      <CafeTable cafes={cafes} onDelete={handleDelete} />
    </Container>
  );
};

export default CafesPage;
