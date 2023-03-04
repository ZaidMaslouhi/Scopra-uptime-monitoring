import React from "react";
import GetInTouch from "../pages/GetInTouch/GetInTouch";
import NotFound from "../pages/NotFound/NotFound";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Registration/Register";
import ProtectedRoute from "./ProtectedRoute";
import Monitors from "../pages/Dashboard/Monitors";
import OnBoarding from "../pages/onBoarding/OnBoarding";
import DashboardLayout from "../layouts/DashboardLayout";
import Github from "../pages/Dashboard/Github";
import Account from "../pages/Dashboard/Account";

export const routes = [
  { key: 1, path: "*", element: <NotFound /> },
  { key: 2, path: "/", element: <GetInTouch />, exact: true },
  { key: 3, path: "/login", element: <Login /> },
  { key: 4, path: "/register", element: <Register /> },
  {
    key: 5,
    path: "/welcome",
    element: (
      <ProtectedRoute>
        <OnBoarding />
      </ProtectedRoute>
    ),
  },
  {
    key: 6,
    path: "/monitors",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Monitors />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    key: 7,
    path: "/github",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Github />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
  {
    key: 8,
    path: "/account",
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <Account />
        </DashboardLayout>
      </ProtectedRoute>
    ),
  },
];
