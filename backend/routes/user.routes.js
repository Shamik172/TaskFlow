import express from "express";
import User from "../models/User.model.js";
import { auth } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/", auth, authorize("admin"), async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

export default router;
