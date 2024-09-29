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
      <TextField
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        name="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <TextField
        name="logo"
        label="Logo URL"
        value={formData.logo}
        onChange={handleChange}
      />
      <TextField
        name="location"
        label="Location"
        value={formData.location}
        onChange={handleChange}
      />
      <Button onClick={() => mutation.mutate()}>Submit</Button>
      <Button onClick={() => navigate("/cafes")}>Cancel</Button>
    </div>
  );
};

export default EditCafePage;
