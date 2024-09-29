import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

const fetchCafe = async (id) => {
  const { data } = await axios.get(`${API_URL}/cafe/${id}`);
  return data;
};

const EditCafePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
  });

  const { data: cafe } = useQuery({
    queryKey: ["cafe", id],
    queryFn: () => fetchCafe(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (cafe) {
      setFormData(cafe);
    }
  }, [cafe]);

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Submitting data:", JSON.stringify(formData));
      if (id) {
        await axios.put(`${API_URL}/cafe/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/cafe`, formData);
      }
    },
    onSuccess: () => {
      navigate("/cafes"); // Redirect to cafes after successful submission
    },
    onError: (error) => {
      console.error("Error saving cafe:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Café" : "Add New Café"}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="logo"
            label="Logo URL"
            value={formData.logo}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            name="location"
            label="Location"
            value={formData.location}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={() => mutation.mutate()}
            variant="contained"
            color="primary"
            style={{ marginRight: 8 }}
          >
            Submit
          </Button>
          <Button onClick={() => navigate("/cafes")} variant="outlined">
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EditCafePage;
