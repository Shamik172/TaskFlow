import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { notify } from "./Notification";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user || user.role !== "admin") {
    notify("Admin access only", "error");
    return <Navigate to="/dashboard" />;
  }

  return children;
}
