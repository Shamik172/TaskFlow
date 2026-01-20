import { useAuth } from "../context/AuthContext"
import { notify } from "../components/Notification"

export default function Dashboard() {
  const { user, logout} = useAuth();
  
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
              className="flex-1 bg-transparent border border-white/30 rounded-lg px-3 py-2 outline-none"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-lg">
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-4 mt-6">
        <input
          type="text"
          placeholder="Search tasks..."
          className="flex-1 bg-white/10 backdrop-blur border border-white/20 
                    rounded-lg px-4 py-2 text-white placeholder-white/60
                    focus:outline-none focus:ring-2 focus:ring-white/30"
        />

        <select
          className="bg-white/10 backdrop-blur border border-white/20 
                    rounded-lg px-4 py-2 text-white
                    focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option className="bg-gray-800 text-white">All</option>
          <option className="bg-gray-800 text-white">Completed</option>
          <option className="bg-gray-800 text-white">Pending</option>
        </select>
      </div>


      {/* Task List */}
      <div className="mt-6 space-y-3">
        <div className="bg-white/10 backdrop-blur border border-white/20 rounded-lg p-4 flex justify-between">
          <span>Finish frontend UI</span>
          <div className="space-x-2">
            <button className="text-green-400">Edit</button>
            <button className="text-red-400">Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}
