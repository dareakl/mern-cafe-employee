// import React from "react";
// import ReactDOM from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import from react-router-dom
// import CafesPage from "./pages/CafesPage";
// import EmployeesPage from "./pages/EmployeesPage";
// import EditCafePage from "./pages/EditCafePage";
// import EditEmployeePage from "./pages/EditEmployeePage";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     <Router>
//       <Routes>
//         <Route path="/" element={<CafesPage />} />
//         <Route path="/cafes" element={<CafesPage />} />
//         <Route path="/employees" element={<EmployeesPage />} />
//         <Route path="/cafes/edit/:id?" element={<EditCafePage />} />
//         <Route path="/employees/edit/:id?" element={<EditEmployeePage />} />
//       </Routes>
//     </Router>
//   </QueryClientProvider>
// );

// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // Import Provider from react-redux
import store from "./store"; // Import your store
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CafesPage from "./pages/CafesPage";
import EmployeesPage from "./pages/EmployeesPage";
import EditCafePage from "./pages/EditCafePage";
import EditEmployeePage from "./pages/EditEmployeePage";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* Wrap your app with Provider */}
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<CafesPage />} />
          <Route path="/cafes" element={<CafesPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/cafes/edit/:id?" element={<EditCafePage />} />
          <Route path="/employees/edit/:id?" element={<EditEmployeePage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  </Provider>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import CafesPage from "./pages/CafesPage";
// import EmployeesPage from "./pages/EmployeesPage";
// import EditCafePage from "./pages/EditCafePage";
// import EditEmployeePage from "./pages/EditEmployeePage";

// const queryClient = new QueryClient();

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <QueryClientProvider client={queryClient}>
//     <Router>
//       <Routes>
//         <Route path="/" element={<CafesPage />} />
//         <Route path="/cafes" element={<CafesPage />} />
//         <Route path="/employees" element={<EmployeesPage />} />
//         <Route path="/cafes/edit/:id?" element={<EditCafePage />} />
//         <Route path="/employees/edit/:id" element={<EditEmployeePage />} />{" "}
//         {/* For editing an employee */}
//         <Route path="/employees/add" element={<EditEmployeePage />} />{" "}
//         {/* For adding an employee */}
//       </Routes>
//     </Router>
//   </QueryClientProvider>
// );
