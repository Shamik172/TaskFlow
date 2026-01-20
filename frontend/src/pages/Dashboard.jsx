import { useEffect, useState} from 'react'
import { useAuth } from "../context/AuthContext"
import { notify } from "../components/Notification"
import { createTask, getTasks, updateTask, deleteTask as deleteTaskApi} from '../services/task.service';

export default function Dashboard() {
  const { user, logout} = useAuth();

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
    try {
      const res = await updateTask(id, {})
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
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
          <h2 className="text-xl mb-2">Profile</h2>
          <p className="text-gray-300">Name: {user?.name}</p>
          <p className="text-gray-300">Email: {user?.email}</p>
          <p className="text-gray-400 text-sm mt-1">Role: {user?.role}</p>
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
