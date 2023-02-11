import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import loading from "../assets/lotties/loading.json";
import Lottie from "lottie-react";

function ProtectedRoute({ children }) {
  const { currentUser, loadingCurrentUser } = useAuth();
  return loadingCurrentUser ? (
    <div className="w-full h-screen flex justify-center items-center bg-slate-200 ">
      <Lottie animationData={loading} loop={true} className="w-64 h-64" />
    </div>
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
