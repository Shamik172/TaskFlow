import api from "./axios";

// Get all tasks (logged-in user)
export const getTasks = () => api.get("/tasks");

// Create new task
export const createTask = (data) => api.post("/tasks", data);

// Update task (status / title)
export const updateTask = (id, data) => api.put(`/tasks/${id}`, data);

// Delete task
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
