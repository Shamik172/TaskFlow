import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { notify } from "./Notification"

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) {
    notify("Please login first", "warning")
    return <Navigate to="/" />
  }

  return children
}
