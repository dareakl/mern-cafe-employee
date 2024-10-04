// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import {
//   TextField,
//   Button,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Grid,
//   Paper,
//   Typography,
//   Alert,
// } from "@mui/material";
// import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

// // Fetch the employee data by ID
// const fetchEmployee = async (id) => {
//   const { data } = await axios.get(`${API_URL}/employee/${id}`);
//   return data;
// };

// // Fetch all cafes for the dropdown
// const fetchCafes = async () => {
//   const { data } = await axios.get(`${API_URL}/cafe`);
//   return data;
// };

// const EditEmployeePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     id: "",
//     name: "",
//     email_address: "",
//     phone_number: "",
//     gender: "Male",
//     cafeId: "",
//     start_date: null,
//   });

//   const [errorMessages, setErrorMessages] = useState([]);

//   // Fetch employee data only if in edit mode
//   const { data: employee, error, isLoading } = useQuery({
//     queryKey: ["employee", id],
//     queryFn: () => fetchEmployee(id),
//     enabled: !!id, // Only fetch if there's an ID
//   });

//   const { data: cafes } = useQuery({
//     queryKey: ["cafes"],
//     queryFn: fetchCafes,
//   });

//   useEffect(() => {
//     if (employee) {
//       setFormData({
//         id: employee.id,
//         name: employee.name,
//         email_address: employee.email_address,
//         phone_number: employee.phone_number,
//         gender: employee.gender,
//         cafeId: employee.cafeId,
//         start_date: employee.start_date ? new Date(employee.start_date) : null,
//       });
//     } else {
//       // If not editing, initialize for adding a new employee
//       setFormData((prev) => ({ ...prev, id: `emp${Date.now()}` }));
//     }
//   }, [employee]);

//   const mutation = useMutation({
//     mutationFn: async () => {
//       if (id) {
//         await axios.put(`${API_URL}/employee/${id}`, formData);
//       } else {
//         await axios.post(`${API_URL}/employee`, formData);
//       }
//     },
//     onSuccess: () => {
//       navigate("/employees");
//     },
//     onError: (error) => {
//       console.error("Error saving employee data:", error);
//       alert("Failed to save employee data. Please try again.");
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleDateChange = (newValue) => {
//     setFormData((prev) => ({ ...prev, start_date: newValue }));
//   };

//   const validateForm = () => {
//     const errors = [];
//     const { name, email_address, phone_number } = formData;

//     if (name.length < 6 || name.length > 10) {
//       errors.push("Name must be between 6 and 10 characters.");
//     }

//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailPattern.test(email_address)) {
//       errors.push("Please enter a valid email address.");
//     }

//     const phonePattern = /^[89]\d{7}$/;
//     if (!phonePattern.test(phone_number)) {
//       errors.push("Phone number must start with 8 or 9 and be 8 digits long.");
//     }

//     // if (!cafeId) {
//     //   errors.push("Please select an assigned café.");
//     // }

//     // if (!start_date) {
//     //   errors.push("Please select a start date.");
//     // }

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

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error fetching employee data.</div>;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <Paper style={{ padding: 16 }}>
//         <Typography variant="h4" gutterBottom>
//           {id ? "Edit Employee" : "Add New Employee"}
//         </Typography>
//         {errorMessages.length > 0 && (
//           <Alert severity="error" style={{ marginBottom: 16 }}>
//             {errorMessages.map((msg, index) => (
//               <div key={index}>{msg}</div>
//             ))}
//           </Alert>
//         )}
//         <Grid container spacing={2}>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="name"
//               label="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               fullWidth
//               inputProps={{ minLength: 6, maxLength: 10 }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="email_address"
//               label="Email Address"
//               value={formData.email_address}
//               onChange={handleChange}
//               required
//               type="email"
//               fullWidth
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="phone_number"
//               label="Phone Number"
//               value={formData.phone_number}
//               onChange={handleChange}
//               required
//               fullWidth
//               inputProps={{ pattern: "^[89]\\d{7}$" }}
//             />
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <RadioGroup
//               name="gender"
//               value={formData.gender}
//               onChange={handleChange}
//             >
//               <FormControlLabel value="Male" control={<Radio />} label="Male" />
//               <FormControlLabel
//                 value="Female"
//                 control={<Radio />}
//                 label="Female"
//               />
//             </RadioGroup>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <TextField
//               name="cafeId"
//               label="Assigned Café"
//               value={formData.cafeId}
//               onChange={handleChange}
//               fullWidth
//               select
//               SelectProps={{ native: true }}
//             >
//               <option value="">Select Café</option>
//               {cafes?.map((cafe) => (
//                 <option key={cafe.id} value={cafe.id}>
//                   {cafe.name}
//                 </option>
//               ))}
//             </TextField>
//           </Grid>
//           <Grid item xs={12} sm={6}>
//             <DatePicker
//               label="Start Date"
//               value={formData.start_date}
//               onChange={handleDateChange}
//               renderInput={(params) => <TextField {...params} required />}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               onClick={handleSubmit}
//               variant="contained"
//               color="primary"
//               style={{ marginRight: 8 }}
//             >
//               Submit
//             </Button>
//             <Button onClick={() => navigate("/employees")} variant="outlined">
//               Cancel
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </LocalizationProvider>
//   );
// };

// export default EditEmployeePage;

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

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4001";

const fetchEmployee = async (id) => {
  const { data } = await axios.get(`${API_URL}/employee/${id}`);
  return data;
};

const fetchCafes = async () => {
  const { data } = await axios.get(`${API_URL}/cafe`);
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

const validate = (values) => {
  const errors = {};
  if (!values.name || values.name.length < 6 || values.name.length > 10) {
    errors.name = "Name must be between 6 and 10 characters.";
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(values.email_address)) {
    errors.email_address = "Please enter a valid email address.";
  }
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
  if (!values.gender) {
    errors.gender = "Please select your gender.";
  }
  return errors;
};

const EditEmployeePage = ({
  handleSubmit,
  initialize,
  pristine,
  submitting,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: employee, error, isLoading } = useQuery({
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

  const onSubmit = (formData) => {
    console.log("Submitting Employee data:", formData);
    mutation.mutate(formData);
  };

  if (isLoading) return <div>Loading...</div>;
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
