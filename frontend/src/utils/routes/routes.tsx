import React from "react";
import ProtectedRoute from "../../middleware/ProtectedRoute";
const NotFound = React.lazy(() => import("../../pages/NotFound/NotFound"));
const GetInTouch = React.lazy(
  () => import("../../pages/GetInTouch/GetInTouch")
);
const Login = React.lazy(() => import("../../pages/Auth/Login/Login"));
const Register = React.lazy(
  () => import("../../pages/Auth/Registration/Register")
);
const Monitors = React.lazy(() => import("../../pages/Dashboard/Monitors"));
const OnBoarding = React.lazy(
  () => import("../../pages/onBoarding/OnBoarding")
);
const Dashboard = React.lazy(() => import("../../components/layout/Dashboard"));
const Github = React.lazy(() => import("../../pages/Dashboard/Github"));
const Account = React.lazy(() => import("../../pages/Dashboard/Account"));
const ProjectSettings = React.lazy(
  () => import("../../pages/Dashboard/ProjectSettings")
);

interface RouteItem {
  key: number;
  path: string;
  element: JSX.Element;
  exact?: boolean;
}

export const routes: RouteItem[] = [
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
        <Dashboard>
          <Monitors />
        </Dashboard>
      </ProtectedRoute>
    ),
  },
  {
    key: 7,
    path: "/github",
    element: (
      <ProtectedRoute>
        <Dashboard>
          <Github />
        </Dashboard>
      </ProtectedRoute>
    ),
  },
  {
    key: 8,
    path: "/account",
    element: (
      <ProtectedRoute>
        <Dashboard>
          <Account />
        </Dashboard>
      </ProtectedRoute>
    ),
  },
  {
    key: 9,
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Dashboard>
          <ProjectSettings />
        </Dashboard>
      </ProtectedRoute>
    ),
  },
];
