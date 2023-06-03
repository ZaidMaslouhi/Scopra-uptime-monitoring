import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectUserState } from "../store/slices/auth.slice";
import { useAppSelector } from "../utils/hooks/react-redux-hooks";
import LoadingAnimation from "../components/ui/loading/LoadingAnimation";

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const user = useAppSelector(selectUserState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.user) navigate("/login");
  }, [user.status, user.user]);

  return user.status === "Succeeded" || user.user ? (
    children
  ) : (
    <LoadingAnimation />
  );
}

export default ProtectedRoute;
