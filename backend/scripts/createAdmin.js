import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import User from "../models/User.model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD,
      10
    );

    await User.create({
      name: "Super Admin",
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Failed to create admin", error);
    process.exit(1);
  }
};

createAdmin();
