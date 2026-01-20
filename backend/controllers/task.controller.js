import Task from "../models/Task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title required" });
    }

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};


// Get logged-in user's tasks
export const getTasks = async (req, res) => {
  try {
    const { status, search } = req.query;

    const query = { user: req.user.id };

    if (status) query.status = status;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(query).sort("-createdAt");
    res.json(tasks);
  } catch {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};


// Toggle status (pending <-> completed)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Toggle status OR update fields
    if (req.body.status) {
      task.status = req.body.status;
    } else {
      task.status =
        task.status === "pending" ? "completed" : "pending";
    }

    if (req.body.title) task.title = req.body.title;
    if (req.body.description) task.description = req.body.description;

    await task.save();
    res.json(task);
  } catch {
    res.status(500).json({ message: "Failed to update task" });
  }
};


export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};


export const getUserTasksAdmin = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const [tasks, total] = await Promise.all([
    Task.find({ user: userId })
      .sort("-createdAt")
      .skip(skip)
      .limit(limit),
    Task.countDocuments({ user: userId }),
  ]);

  res.json({
    tasks,
    pagination: {
      page,
      pages: Math.ceil(total / limit),
      total,
    },
  });
};

