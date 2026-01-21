import { useEffect, useState} from 'react'
import { useAuth } from "../context/AuthContext"
import { notify } from "../components/Notification"
import { createTask, getTasks, updateTask, deleteTask as deleteTaskApi} from '../services/task.service';
import { uploadAvatar } from '../services/user.service';
import avatar from '../assets/avatar.jpeg'

export default function Dashboard() {
  const { user, setUser, logout} = useAuth();

  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState("")
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(true)

  // fetch tasks
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await getTasks()
        setTasks(res.data)
      } catch {
        notify("Failed to load Tasks", "error")
      } finally {
        setLoading(false)
      }
    }
    fetchTask()
  },[])

  // Create task
  const handleAddTask = async () => {
    if (!title.trim()) return

    try {
      const res = await createTask({title})
      setTasks([res.data, ...tasks])
      setTitle("")
      notify("Task added", "success")
    } catch {
      notify("Failed to add task", "error")
    }
  }

  // Toggle task status
  const toggleTask = async (id) => {
    const taskToUpdate = tasks.find(t => t._id === id);
    try {
      const res = await updateTask(id, { title: taskToUpdate.title })
      setTasks(tasks.map(t => (t._id === id ? res.data : t)))
    } catch {
      notify("Update failed", "error")
    }
  }

  // Delete task
  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id)
      setTasks(tasks.filter(t => t._id !== id))
      notify("Task deleted", "success")
    } catch {
      notify("Delete failed", "error")
    }
  }

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const formData = new FormData();
    formData.append("avatar", file)

    try {
      const res = await uploadAvatar(formData);

      // Update local state instantly using the response from Cloudinary/DB
      if(res.data.avatar) {
        setUser({
          ...user,
          avatar: res.data.avatar  // replaces the old avatar object with the new {url, public_id}
        });
        notify("Avatar updated", "success");
      }
    } catch {
      notify("Avatar upload failed", "error")
    }
  }

  // Filter + Search logic
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesFilter =
      filter === "all" || task.status === filter

    return matchesSearch && matchesFilter
  })
  
  const handleLogout = async () => {
    await logout();
    notify("Logged out Successfully", "success")
  }

  return (
    <div className="min-h-screen p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">TaskFlow Dashboard</h1>
        <button 
        onClick={handleLogout}
        className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg">
          Logout
        </button>
      </div>

      {/* Glass Container */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Profile */}
<div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 flex flex-col items-center gap-4">
  
  {/* Avatar */}
  <div className="relative">
    <img
      src={user?.avatar?.url || avatar}
      alt="avatar"
      className="w-24 h-24 rounded-full object-cover border border-white/30"
    />

    <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700">
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleAvatarUpload}
      />
      📷
    </label>
  </div>

  {/* Info */}
  <div className="text-center">
    <p className="text-gray-200 font-medium">{user?.name}</p>
    <p className="text-gray-400 text-sm">{user?.email}</p>
    <p className="text-gray-500 text-xs">Role: {user?.role}</p>
  </div>
</div>


        {/* Create Task */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 md:col-span-2">
          <h2 className="text-xl mb-4">Create Task</h2>

          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 bg-transparent border border-white/30 rounded-lg px-3 py-2 outline-none"
            />
            <button 
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/10 backdrop-blur border border-white/20 
                    rounded-lg px-4 py-2 text-white placeholder-white/60
                    focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/10 backdrop-blur border border-white/20 
                    rounded-lg px-4 py-2 text-white
                    focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="all" className="bg-gray-800 text-white">All</option>
          <option value="completed" className="bg-gray-800 text-white">Completed</option>
          <option value="pending" className="bg-gray-800 text-white">Pending</option>
        </select>
      </div>


      {/* Task List */}
      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-gray-400">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-gray-400">No tasks found</p>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task._id}
              className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 flex justify-between items-center"
            >
              <span
                className={
                  task.status === "completed"
                    ? "line-through text-gray-400"
                    : ""
                }
              >
                {task.title}
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => toggleTask(task._id)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition
                    ${
                      task.status === "completed"
                        ? "bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/30"
                        : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                    }`}
                >
                  {task.status === "completed" ? "Undo" : "Done"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="px-3 py-1 rounded-md text-sm font-medium
                            bg-red-500/20 text-red-300 hover:bg-red-500/30
                            transition"
                >
                  Delete
                </button>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  )
}
