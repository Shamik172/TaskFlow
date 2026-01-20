import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from "./components/AdminRoute"

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
            } />
          <Route
            path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
