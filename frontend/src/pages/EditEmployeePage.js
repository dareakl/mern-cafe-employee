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
} from "@mui/material";
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
    id: id ? `emp${id}` : `emp${Date.now()}`, // Generate a new id for new employees
    name: "",
    email_address: "",
    phone_number: "",
    gender: "Male",
    cafeId: "",
    start_date: new Date().toISOString(), // Default start date to now
  });

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
      console.log("Submitting data:", JSON.stringify(formData)); // Log formData
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

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h4" gutterBottom>
        Edit Employee
      </Typography>
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
            inputProps={{ pattern: "^[89]\\d{7}$" }} // Regex for SG phone number
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
        <Grid item xs={12}>
          <Button
            onClick={() => mutation.mutate()} // Trigger the mutation on click
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
  );
};

export default EditEmployeePage;
