import { useEffect, useState } from "react";
import api from "../services/axios";
import { notify } from "../components/Notification";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data);
      } catch {
        notify("Access denied", "error");
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = async () => {
    await logout();
    notify("Logged out successfully", "success");
    navigate("/");
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Users list */}
      <div className="space-y-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white/10 border border-white/20 rounded-lg p-4"
          >
            <p>
              {u.name}{" "}
              <span className="text-gray-400">({u.email})</span>
            </p>
            <p className="text-sm text-gray-400">Role: {u.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
