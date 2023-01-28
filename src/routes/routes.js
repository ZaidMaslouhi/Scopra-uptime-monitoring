import React from "react";
import GetInTouch from "../pages/GetInTouch/GetInTouch";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import Registration from "../pages/Auth/Registration/Registration";

export const routes = [
  { key: 1, path: "*", element: <NotFound /> },
  { key: 2, path: "/", element: <GetInTouch />, exact: true },
  { key: 3, path: "/login", element: <Login /> },
  { key: 4, path: "/register", element: <Registration /> },
];
