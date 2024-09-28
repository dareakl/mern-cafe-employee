//import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchCafe, createCafe, updateCafe } from "../api";

const CafeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [cafe, setCafe] = useState({
    name: "",
    description: "",
    logo: "",
    location: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useQuery(["cafe", id], () => fetchCafe(id), {
    enabled: !!id,
    onSuccess: (data) => {
      setCafe(data);
      setIsEdit(true);
    },
  });

  const mutation = useMutation(isEdit ? updateCafe : createCafe, {
    onSuccess: () => {
      navigate("/cafes");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafe({ ...cafe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(cafe);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        name="name"
        value={cafe.name}
        onChange={handleChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={cafe.description}
        onChange={handleChange}
        required
      />
      <TextField
        type="file"
        name="logo"
        onChange={(e) => setCafe({ ...cafe, logo: e.target.files[0] })}
        required
      />
      <TextField
        label="Location"
        name="location"
        value={cafe.location}
        onChange={handleChange}
        required
      />
      <Button type="submit">{isEdit ? "Update" : "Add"} Cafe</Button>
      <Button onClick={() => navigate("/cafes")}>Cancel</Button>
    </form>
  );
};

export default CafeForm;
