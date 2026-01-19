import { useState, useEffect } from "react"
import { createRoot } from "react-dom/client"

let addNotificationGlobal = null

export const notify = (message, type = "info", duration = 4000) => {
  if (addNotificationGlobal) {
    addNotificationGlobal({ message, type, duration })
  }
}

function NotificationContainer() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    addNotificationGlobal = ({ message, type, duration }) => {
      const id = crypto.randomUUID()
      setNotifications((prev) => [...prev, { id, message, type, duration }])

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
      }, duration)
    }
  }, [])

  const typeStyles = {
    success: "from-green-500/30 to-emerald-500/10 border-green-400/30",
    error: "from-red-500/30 to-rose-500/10 border-red-400/30",
    warning: "from-yellow-500/30 to-amber-500/10 border-yellow-400/30",
    info: "from-blue-500/30 to-indigo-500/10 border-blue-400/30",
  }

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`relative w-[320px] rounded-2xl border bg-gradient-to-br ${
            typeStyles[n.type]
          } backdrop-blur-xl px-5 py-4 text-white shadow-2xl animate-slide-in`}
        >
          <p className="font-medium">{n.message}</p>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 w-full bg-white/20 rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-white/70"
              style={{
                animation: `progressBar ${n.duration}ms linear forwards`,
              }}
            />
          </div>
        </div>
      ))}

      <style>{`
        @keyframes progressBar {
          from { width: 100%; }
          to { width: 0%; }
        }

        .animate-slide-in {
          animation: slideIn 0.35s ease-out;
        }

        @keyframes slideIn {
          from { transform: translateY(-12px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

/* Mount once */
export const mountNotifications = () => {
  const container = document.createElement("div")
  document.body.appendChild(container)
  createRoot(container).render(<NotificationContainer />)
}
