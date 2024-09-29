import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TextField, Button } from "@mui/material";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

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
      console.log("Sending request to:", id ? `/cafe/${id}` : `/cafe`);
      if (id) {
        await axios.put(`${API_URL}/cafe/${id}`, formData);
      } else {
        await axios.post(`${API_URL}/cafe`, formData);
      }
    },
    onSuccess: () => {
      navigate("/"); // Redirect to home after successful submission
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
