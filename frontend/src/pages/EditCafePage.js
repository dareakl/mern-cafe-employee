import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Field, reduxForm } from "redux-form";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
// Base URL for the API, falling back to localhost if not set
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";
// Function to fetch café data by ID
const fetchCafe = async (id) => {
  const { data } = await axios.get(`${API_URL}/cafe/${id}`);
  return data;
};
// Render a text field with error handling
const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    {...input}
    label={label}
    error={touched && Boolean(error)}
    helperText={touched && error}
    {...custom}
  />
);
// Validation function for the form fields
const validate = (values) => {
  const errors = {};

  // Name validation
  if (!values.name) {
    errors.name = "Name is required.";
  } else if (values.name.length < 6 || values.name.length > 10) {
    errors.name = "Name must be between 6 and 10 characters.";
  }

  // Description validation
  if (!values.description) {
    errors.description = "Description is required.";
  } else if (values.description.length > 256) {
    errors.description = "Description must not exceed 256 characters.";
  }

  // Location validation
  if (!values.location) {
    errors.location = "Location is required.";
  }

  return errors;
};
// EditCafePage component for editing or adding a café
const EditCafePage = ({ handleSubmit, initialize }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Query to fetch cafe data if editing
  const { data: cafe } = useQuery({
    queryKey: ["cafe", id],
    queryFn: () => fetchCafe(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (cafe) {
      initialize(cafe); // Pre-fill the form with fetched data for editing
    }
  }, [cafe, initialize]);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (id) {
        await axios.put(`${API_URL}/cafe/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/cafe`, formData);
      }
    },
    onSuccess: () => {
      navigate("/cafes"); // Redirect after successful submission
    },
    onError: (error) => {
      console.error("Error saving cafe:", error);
    },
  });
  // Form submission handler
  const onSubmit = (formData) => {
    console.log("Submitting data:", formData);
    mutation.mutate(formData);
  };

  return (
    <Paper style={{ padding: 16, marginTop: 16 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Café" : "Add New Café"}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              name="name"
              component={renderTextField}
              label="Name"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="description"
              component={renderTextField}
              label="Description"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="logo"
              component={renderTextField}
              label="Logo URL"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              name="location"
              component={renderTextField}
              label="Location"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
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
      </form>
      {mutation.isError && (
        <Alert severity="error" style={{ marginTop: 16 }}>
          Error saving café: {mutation.error.message}
        </Alert>
      )}
    </Paper>
  );
};

export default reduxForm({
  form: "editCafe", // a unique identifier for this form
  validate, // Attach the validation function
})(EditCafePage);
