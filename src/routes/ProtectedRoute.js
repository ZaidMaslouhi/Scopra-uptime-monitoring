import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return currentUser ? children : navigate("/login");
}

export default ProtectedRoute;
