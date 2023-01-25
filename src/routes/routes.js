import React from "react";
import GetInTouch from "../pages/GetInTouch/GetInTouch";
import NotFound from "../pages/NotFound/NotFound";

export const routes = [
  { key: 1, path: "/", element: <GetInTouch />, exact: true },
  { key: 2, path: "*", element: <NotFound /> },
];
