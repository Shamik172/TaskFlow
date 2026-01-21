import express from "express";
import User from "../models/User.model.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import { getUserTasksAdmin } from "../controllers/task.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadAvatar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", authMiddleware, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

// Admin: get tasks of any user (paginated)
router.get(
  "/admin/:userId",
  authMiddleware,
  authorize("admin"),
  getUserTasksAdmin
);

router.patch(
  "/avatar", 
  authMiddleware, 
  upload.single("avatar"), 
  uploadAvatar
);

export default router;
