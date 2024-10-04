// import React, { useState } from "react";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { Container, Button, Typography } from "@mui/material";
// import CafeTable from "../components/CafeTable";
// import { fetchCafes, deleteCafe } from "../utils/api";

// const CafesPage = () => {
//   const [locationFilter] = useState("");

//   // Query for fetching cafes
//   const { data: cafes, refetch, isLoading } = useQuery({
//     queryKey: ["cafes", locationFilter],
//     queryFn: () => fetchCafes(locationFilter),
//   });

//   // Mutation for deleting a cafe
//   const mutation = useMutation({
//     mutationFn: (id) => deleteCafe(id),
//     onSuccess: () => {
//       refetch(); // Refresh the cafes list after deletion
//     },
//   });

//   // Handle deletion of a cafe
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this café?")) {
//       mutation.mutate(id);
//     }
//   };

//   // Loading and no cafes states
//   if (isLoading) return <div>Loading...</div>;
//   if (!cafes || cafes.length === 0) return <div>No cafés found.</div>;

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Cafés
//       </Typography>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={() => (window.location.href = "/cafes/edit")}
//       >
//         Add New Café
//       </Button>
//       <CafeTable cafes={cafes} onDelete={handleDelete} />
//     </Container>
//   );
// };

// export default CafesPage;

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  Container,
  Button,
  Typography,
  CircularProgress,
  Alert,
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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this café?")) {
      mutation.mutate(id);
    }
  };

  if (isLoading) return <CircularProgress />;
  if (isError)
    return (
      <Alert severity="error">Error fetching cafés: {error.message}</Alert>
    );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Cafés
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => (window.location.href = "/cafes/edit")}
      >
        Add New Café
      </Button>
      <CafeTable cafes={cafes} onDelete={handleDelete} />

      {successMessage && (
        <Alert severity="success">
          {
            successMessage // Conditionally render success message
          }
        </Alert>
      )}
    </Container>
  );
};

export default CafesPage;
