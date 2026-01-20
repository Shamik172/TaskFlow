import { useEffect, useState } from "react";
import api from "../services/axios";
import { notify } from "../components/Notification";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserActivityModal from '../components/UserActivityModal'

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);

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
      {/* USERS — DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-white/20">
        <table className="w-full min-w-[600px] border-collapse">
          <thead className="bg-white/10">
            <tr className="text-left text-sm text-gray-300">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr
                key={u._id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="p-4">{u.name}</td>
                <td className="p-4 text-gray-400">{u.email}</td>
                <td className="p-4 capitalize">{u.role}</td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => setSelectedUser(u)}
                    className="bg-blue-600/80 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                  >
                    View Activity
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* USERS — MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white/10 border border-white/20 rounded-xl p-4"
          >
            <div className="space-y-1">
              <p className="font-semibold text-lg">{u.name}</p>
              <p className="text-sm text-gray-400">{u.email}</p>
              <p className="text-sm capitalize">
                Role: <span className="text-white">{u.role}</span>
              </p>
            </div>

            <button
              onClick={() => setSelectedUser(u)}
              className="mt-3 w-full bg-blue-600/80 hover:bg-blue-700 py-2 rounded-lg text-sm"
            >
              View Activity
            </button>
          </div>
        ))}
      </div>


      {selectedUser && (
        <UserActivityModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

    </div>
  );
}
