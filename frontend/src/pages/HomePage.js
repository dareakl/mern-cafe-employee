import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to the Cafe Employee Application
      </Typography>
      <Typography variant="body1" gutterBottom>
        Manage your cafes and employees efficiently.
      </Typography>
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/cafes")}
          style={{ marginRight: "10px" }}
        >
          Go to Cafés
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/employees")}
        >
          Go to Employees
        </Button>
      </Box>
    </Container>
  );
};

export default HomePage;
