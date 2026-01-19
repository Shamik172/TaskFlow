import { Link } from "react-router-dom"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Box with solid-dark background and crisp borders */}
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-slate-400 text-sm mt-1">Please enter your details.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg mt-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20">
            Sign in
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}