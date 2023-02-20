import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import LoadingAnimation from "../components/loading/LoadingAnimation";

function ProtectedRoute({ children }) {
  const { currentUser, loadingCurrentUser } = useAuth();
  return loadingCurrentUser ? (
    <LoadingAnimation />
  ) : currentUser ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
