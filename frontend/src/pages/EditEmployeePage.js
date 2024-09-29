import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  Paper,
  Typography,
  Alert, // Import Alert
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

// Fetch the employee data by ID
const fetchEmployee = async (id) => {
  const { data } = await axios.get(`${API_URL}/employee/${id}`);
  return data;
};

// Fetch all cafes for the dropdown
const fetchCafes = async () => {
  const { data } = await axios.get(`${API_URL}/cafe`);
  return data;
};

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: id ? `emp${id}` : `emp${Date.now()}`,
    name: "",
    email_address: "",
    phone_number: "",
    gender: "Male",
    cafeId: "",
    start_date: null,
  });

  const [errorMessages, setErrorMessages] = useState([]); // State for error messages

  const { data: employee } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  });

  const { data: cafes } = useQuery({
    queryKey: ["cafes"],
    queryFn: fetchCafes,
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Submitting data:", JSON.stringify(formData));
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
      alert("Failed to save employee data. Please try again.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, start_date: newValue }));
  };

  const validateForm = () => {
    const errors = [];
    const { name, email_address, phone_number, cafeId, start_date } = formData;

    if (name.length < 6 || name.length > 10) {
      errors.push("Name must be between 6 and 10 characters.");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email_address)) {
      errors.push("Please enter a valid email address.");
    }

    const phonePattern = /^[89]\d{7}$/;
    if (!phonePattern.test(phone_number)) {
      errors.push("Phone number must start with 8 or 9 and be 8 digits long.");
    }

    if (!cafeId) {
      errors.push("Please select an assigned café.");
    }

    if (!start_date) {
      errors.push("Please select a start date.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors); // Set the error messages
      return false;
    }

    setErrorMessages([]); // Clear error messages if valid
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      mutation.mutate();
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper style={{ padding: 16 }}>
        <Typography variant="h4" gutterBottom>
          Edit Employee
        </Typography>
        {errorMessages.length > 0 && ( // Display error messages
          <Alert severity="error" style={{ marginBottom: 16 }}>
            {errorMessages.map((msg, index) => (
              <div key={index}>{msg}</div>
            ))}
          </Alert>
        )}
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ minLength: 6, maxLength: 10 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="email_address"
              label="Email Address"
              value={formData.email_address}
              onChange={handleChange}
              required
              type="email"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="phone_number"
              label="Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ pattern: "^[89]\\d{7}$" }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <RadioGroup
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="cafeId"
              label="Assigned Café"
              value={formData.cafeId}
              onChange={handleChange}
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
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Start Date"
              value={formData.start_date}
              onChange={handleDateChange}
              renderInput={(params) => <TextField {...params} required />}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              style={{ marginRight: 8 }}
            >
              Submit
            </Button>
            <Button onClick={() => navigate("/employees")} variant="outlined">
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </LocalizationProvider>
  );
};

export default EditEmployeePage;
