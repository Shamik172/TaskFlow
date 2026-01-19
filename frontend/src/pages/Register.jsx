import { Link } from "react-router-dom"

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">Get Started</h2>
          <p className="text-slate-400 text-sm mt-1">Join us today.</p>
        </div>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-500"
            />
          </div>

          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg mt-2 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Already have an account?{" "}
          <Link to="/" className="text-emerald-400 hover:text-emerald-300 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}