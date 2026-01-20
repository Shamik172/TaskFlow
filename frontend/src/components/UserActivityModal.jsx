import { useEffect, useState } from "react";
import api from "../services/axios";
import { notify } from "./Notification";

export default function UserActivityModal({ user, onClose }) {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      const res = await api.get(
        `/users/admin/${user._id}?page=${page}&limit=${limit}`
      );
      setTasks(res.data.tasks);
      setPages(res.data.pagination.pages);
    } catch {
      notify("Failed to load activity", "error");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4">
  <div className="bg-slate-900 w-full max-w-lg max-h-[90vh]
                  overflow-y-auto p-4 sm:p-6
                  rounded-xl border border-white/20">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {user.name}'s Activity
          </h2>
          <button onClick={onClose} className="text-red-400">✕</button>
        </div>

        {/* Tasks */}
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <p className="text-gray-400">No tasks found</p>
          ) : (
            tasks.map(t => (
  <div
    key={t._id}
    className="bg-white/10 border border-white/20 rounded-lg p-3
               flex justify-between items-center"
  >
    {/* Left: Task title */}
    <p className="text-white">{t.title}</p>

    {/* Right: Status badge */}
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full
        ${
          t.status === "completed"
            ? "bg-green-500/20 text-green-300 border border-green-500/30"
            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
        }`}
    >
      {t.status === "completed" ? "Completed" : "Pending"}
    </span>
  </div>
))

          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-400">
            Page {page} of {pages}
          </span>

          <button
            disabled={page === pages}
            onClick={() => setPage(p => p + 1)}
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
