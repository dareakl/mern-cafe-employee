import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";

const fetchEmployee = async (id) => {
  const { data } = await axios.get(`/employee/${id}`);
  return data;
};

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    gender: "Male",
    cafeId: "",
  });

  const { data: employee } = useQuery({
    queryKey: ["employee", id],
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const mutation = useMutation(async () => {
    if (id) {
      await axios.put(`/employee/${id}`, formData);
    } else {
      await axios.post("/employee", formData);
    }
    navigate("/employees");
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
        inputProps={{ minLength: 6, maxLength: 10 }}
      />
      <TextField
        name="email_address"
        label="Email Address"
        value={formData.email_address}
        onChange={handleChange}
        required
        type="email"
      />
      <TextField
        name="phone_number"
        label="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
        inputProps={{ pattern: "^[89]\\d{7}$" }} // Regex for SG phone number
      />
      <RadioGroup name="gender" value={formData.gender} onChange={handleChange}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
      </RadioGroup>
      <TextField
        name="cafeId"
        label="Assigned Café ID"
        value={formData.cafeId}
        onChange={handleChange}
        select
        SelectProps={{ native: true }}
      >
        <option value="">Select Café</option>
        {/* Add other café options */}
      </TextField>
      <Button onClick={() => mutation.mutate()}>Submit</Button>
      <Button onClick={() => navigate("/employees")}>Cancel</Button>
    </div>
  );
};

export default EditEmployeePage;
