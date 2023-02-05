import React from "react";
import GetInTouch from "../pages/GetInTouch/GetInTouch";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Registration/Register";
import Dashboard from "../pages/Dashboard/Dashboard";

export const routes = [
  { key: 1, path: "*", element: <NotFound /> },
  { key: 2, path: "/", element: <GetInTouch />, exact: true },
  { key: 3, path: "/login", element: <Login /> },
  { key: 4, path: "/register", element: <Register /> },
  { key: 5, path: "/dashboard", element: <Dashboard /> },
];
