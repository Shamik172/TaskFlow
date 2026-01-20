import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";
import { notify } from "../components/Notification";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      notify("Account created successfully", "success");
      navigate("/");
    } catch (err) {
      notify(err.response?.data?.message || "Registration failed", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-slate-900 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">Get Started</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            className="w-full bg-slate-800 px-4 py-2.5 rounded-lg"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            className="w-full bg-slate-800 px-4 py-2.5 rounded-lg"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-slate-800 px-4 py-2.5 rounded-lg"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-emerald-600 py-3 rounded-lg">
            Create Account
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate-400">
          Already have an account?{" "}
          <Link to="/" className="text-emerald-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
