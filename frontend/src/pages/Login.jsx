import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";
import { useAuth } from "../context/AuthContext";
import { notify } from "../components/Notification";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      const loggedInUser = res.data.user;

      login(loggedInUser);
      notify("Login successful", "success");

      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      notify(err.response?.data?.message || "Login failed", "error");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-700/50 rounded-2xl p-8 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-3xl font-bold text-white mb-6">Welcome Back</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
            Sign in
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
