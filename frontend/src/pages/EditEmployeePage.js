import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Field, reduxForm } from "redux-form";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";
// API base URL
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";
// Function to fetch employee data by ID
const fetchEmployee = async (id) => {
  const { data } = await axios.get(`${API_URL}/employee/${id}`);
  return data;
};
// Function to fetch all cafes for the select input
const fetchCafes = async () => {
  const { data } = await axios.get(`${API_URL}/cafe`);
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
// Render a radio group for gender selection
const renderRadioGroup = ({ input, meta: { touched, error } }) => (
  <div>
    <RadioGroup {...input}>
      <FormControlLabel value="Male" control={<Radio />} label="Male" />
      <FormControlLabel value="Female" control={<Radio />} label="Female" />
    </RadioGroup>
    {touched && error && (
      <Typography variant="body2" color="error">
        {error}
      </Typography>
    )}
  </div>
);
// Validation function for the form fields
const validate = (values) => {
  const errors = {};
  // Name validation
  if (!values.name || values.name.length < 6 || values.name.length > 10) {
    errors.name = "Name must be between 6 and 10 characters.";
  }
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email_address)) {
    errors.email_address = "Please enter a valid email address.";
  }
  // Phone number validation
  const phonePattern = /^[89]\d{7}$/;
  if (!phonePattern.test(values.phone_number)) {
    errors.phone_number =
      "Phone number must start with 8 or 9 and be 8 digits long.";
  }
  // if (!values.cafeId) {
  //   errors.cafeId = "Please select an assigned café.";
  // }
  // if (!values.start_date) {
  //   errors.start_date = "Please select a start date.";
  // }
  // Gender validation
  if (!values.gender) {
    errors.gender = "Please select your gender.";
  }
  return errors;
};
// EditEmployeePage component for editing or adding an employee
const EditEmployeePage = ({
  handleSubmit,
  initialize,
  pristine,
  submitting,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Query to fetch employee data
  const { data: employee, error, isLoading } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  });
  // Query to fetch cafés for the café select input
  const { data: cafes } = useQuery({
    queryKey: ["cafes"],
    queryFn: fetchCafes,
  });
  // Initialize form with fetched employee data for editing
  useEffect(() => {
    if (employee) {
      initialize({
        name: employee.name,
        email_address: employee.email_address,
        phone_number: employee.phone_number,
        gender: employee.gender,
        cafeId: employee.cafeId || "",
        start_date: employee.start_date ? new Date(employee.start_date) : null,
      });
    }
  }, [employee, initialize]);
  // Mutation for saving employee data
  const mutation = useMutation({
    mutationFn: async (formData) => {
      if (id) {
        await axios.put(`${API_URL}/employee/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/employee`, formData);
      }
    },
    onSuccess: () => {
      navigate("/employees");
    },
    onError: (error) => {
      console.error("Error saving employee data:", error);
      console.error("Server response:", error.response.data);
      alert("Failed to save employee data. Please try again.");
    },
  });
  // Form submission handler
  const onSubmit = (formData) => {
    console.log("Submitting Employee data:", formData);
    mutation.mutate(formData);
  };
  // Loading state
  if (isLoading) return <div>Loading...</div>;
  // Error handling
  if (error) return <div>Error fetching employee data.</div>;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" gutterBottom>
          {id ? "Edit Employee" : "Add New Employee"}
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
                name="email_address"
                component={renderTextField}
                label="Email Address"
                fullWidth
                required
                type="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="phone_number"
                component={renderTextField}
                label="Phone Number"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field name="gender" component={renderRadioGroup} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="cafeId"
                component={renderTextField}
                label="Assigned Café"
                fullWidth
                select
                SelectProps={{ native: true }}
              >
                <option value="">Select Café</option>
                {cafes?.map((cafe) => (
                  <option key={cafe.id} value={cafe.id}>
                    {cafe.name}
                  </option>
                ))}
              </Field>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Field
                name="start_date"
                component={({ input }) => (
                  <DesktopDatePicker
                    label="Start Date"
                    value={input.value || null}
                    onChange={(newValue) => input.onChange(newValue)}
                    slots={{
                      textField: (params) => <TextField {...params} />,
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={pristine || submitting}
                style={{ marginRight: 8 }}
              >
                Submit
              </Button>
              <Button onClick={() => navigate("/employees")} variant="outlined">
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
        {mutation.isError && (
          <Alert severity="error" style={{ marginTop: 16 }}>
            Error saving employee: {mutation.error.message}
          </Alert>
        )}
      </Paper>
    </LocalizationProvider>
  );
};

export default reduxForm({
  form: "editEmployee", // a unique identifier for this form
  validate, // Attach the validation function
})(EditEmployeePage);
