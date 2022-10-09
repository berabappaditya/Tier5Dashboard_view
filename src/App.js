import React from "react";
import "./App.css";
import Welcome from "./Container/Welcome";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Login from "./Container/Login";
import SignUp from "./Container/SignUp";
import DashBoard from "./Container/DashBoard/DashBoard";
const router = createHashRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    // loader: teamLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
