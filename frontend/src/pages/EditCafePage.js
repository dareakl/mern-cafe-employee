import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "@tanstack/router";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TextField, Button } from "@mui/material";
import axios from "axios";

const fetchCafe = async (id) => {
  const { data } = await axios.get(`/cafe/${id}`);
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

  // Fetch cafe only if an ID is present
  const { data: cafe } = useQuery(["cafe", id], () => fetchCafe(id), {
    enabled: !!id,
  });

  useEffect(() => {
    if (cafe) {
      setFormData(cafe);
    }
  }, [cafe]);

  const mutation = useMutation(async () => {
    if (id) {
      await axios.put(`/cafe/${id}`, formData);
    } else {
      await axios.post("/cafe", formData);
    }
    navigate("/cafes");
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>{id ? "Edit Café" : "Add New Café"}</h2>
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="logo"
        label="Logo URL"
        value={formData.logo}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
        fullWidth
      />
      <Button
        onClick={() => mutation.mutate()}
        variant="contained"
        color="primary"
      >
        Submit
      </Button>
      <Button onClick={() => navigate("/cafes")} variant="outlined">
        Cancel
      </Button>
    </div>
  );
};

export default EditCafePage;
