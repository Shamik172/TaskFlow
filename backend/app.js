import express from "express";
import cors from "cors";

// import authRoutes from "./routes/auth.routes.js";
// import taskRoutes from "./routes/task.routes.js";
// import userRoutes from "./routes/user.routes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API is running 🚀" });
});

// // API routes (versioned)
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/tasks", taskRoutes);
// app.use("/api/v1/users", userRoutes);

export default app;
