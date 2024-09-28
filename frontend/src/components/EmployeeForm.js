import React, { useState } from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchEmployee,
  createEmployee,
  updateEmployee,
  fetchCafes,
} from "../api";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: "",
    email_address: "",
    phone_number: "",
    gender: "",
    cafeId: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useQuery(["employee", id], () => fetchEmployee(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setEmployee(data);
      setIsEdit(true);
    },
  });

  const { data: cafes } = useQuery("cafes", fetchCafes);

  const mutation = useMutation(isEdit ? updateEmployee : createEmployee, {
    onSuccess: () => {
      navigate("/employees");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(employee);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={employee.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email_address"
        value={employee.email_address}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        name="phone_number"
        value={employee.phone_number}
        onChange={handleChange}
        required
      />
      <RadioGroup name="gender" value={employee.gender} onChange={handleChange}>
        <FormControlLabel value="Male" control={<Radio />} label="Male" />
        <FormControlLabel value="Female" control={<Radio />} label="Female" />
      </RadioGroup>
      <TextField
        select
        label="Assigned Cafe"
        name="cafeId"
        value={employee.cafeId}
        onChange={handleChange}
        required
      >
        {cafes.map((cafe) => (
          <option key={cafe.id} value={cafe.id}>
            {cafe.name}
          </option>
        ))}
      </TextField>
      <Button type="submit">{isEdit ? "Update" : "Add"} Employee</Button>
      <Button onClick={() => navigate("/employees")}>Cancel</Button>
    </form>
  );
};

export default EmployeeForm;
