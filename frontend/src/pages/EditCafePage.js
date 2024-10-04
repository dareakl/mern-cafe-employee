// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import {
//   TextField,
//   Button,
//   Grid,
//   Paper,
//   Typography,
//   Alert,
// } from "@mui/material";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

// const fetchCafe = async (id) => {
//   const { data } = await axios.get(`${API_URL}/cafe/${id}`);
//   return data;
// };

// const EditCafePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     logo: "",
//     location: "",
//   });
//   const [errorMessages, setErrorMessages] = useState([]);

//   const { data: cafe } = useQuery({
//     queryKey: ["cafe", id],
//     queryFn: () => fetchCafe(id),
//     enabled: !!id,
//   });

//   useEffect(() => {
//     if (cafe) {
//       setFormData(cafe);
//     }
//   }, [cafe]);

//   const mutation = useMutation({
//     mutationFn: async () => {
//       console.log("Submitting data:", JSON.stringify(formData));
//       if (id) {
//         await axios.put(`${API_URL}/cafe/${id}`, formData);
//       } else {
//         await axios.post(`${API_URL}/cafe`, formData);
//       }
//     },
//     onSuccess: () => {
//       navigate("/cafes");
//     },
//     onError: (error) => {
//       console.error("Error saving cafe:", error);
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const validateForm = () => {
//     const errors = [];
//     const { name, description, logo, location } = formData;

//     if (name.length < 6 || name.length > 10) {
//       errors.push("Name must be between 6 and 10 characters.");
//     }

//     if (!description) {
//       errors.push("Description is required.");
//     } else if (description.length > 256) {
//       errors.push("Description must not exceed 256 characters.");
//     }

//     // Optional logo validation
//     if (logo && !/^(http|https):\/\/.*\.(jpg|jpeg|png|gif)$/.test(logo)) {
//       errors.push("Logo must be a valid URL for an image.");
//     }

//     if (location.length < 6 || location.length > 20) {
//       errors.push("Location must be between 6 and 20 characters.");
//     }

//     if (errors.length > 0) {
//       setErrorMessages(errors);
//       return false;
//     }

//     setErrorMessages([]);
//     return true;
//   };

//   const handleSubmit = () => {
//     if (validateForm()) {
//       mutation.mutate();
//     }
//   };

//   return (
//     <Paper style={{ padding: 16, marginTop: 16 }}>
//       <Typography variant="h4" gutterBottom>
//         {id ? "Edit Café" : "Add New Café"}
//       </Typography>
//       {errorMessages.length > 0 && (
//         <Alert severity="error" style={{ marginBottom: 16 }}>
//           {errorMessages.map((msg, index) => (
//             <div key={index}>{msg}</div>
//           ))}
//         </Alert>
//       )}
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="name"
//             label="Name"
//             value={formData.name}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="description"
//             label="Description"
//             value={formData.description}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="logo"
//             label="Logo URL"
//             value={formData.logo}
//             onChange={handleChange}
//             fullWidth
//             // File input handled separately
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             name="location"
//             label="Location"
//             value={formData.location}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             color="primary"
//             style={{ marginRight: 8 }}
//           >
//             Submit
//           </Button>
//           <Button onClick={() => navigate("/cafes")} variant="outlined">
//             Cancel
//           </Button>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// };

// export default EditCafePage;

// pages/EditCafePage.js
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

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

const fetchCafe = async (id) => {
  const { data } = await axios.get(`${API_URL}/cafe/${id}`);
  return data;
};

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
