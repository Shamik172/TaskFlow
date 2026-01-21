import User from "../models/User.model.js"
import cloudinary from "../config/cloudinary.js"
import fs from 'fs'

export const uploadAvatar = async (req, res) => {
    try {
        if(!req.file) {
            return res.status(400).json({ message: "No image uploaded "})
        }

        const user = await User.findById(req.user.id)
        if(!user) {
            fs.unlinkSync(req.file.path);
            return res.status(404).json({ message: "User not found"})
        }

        // delete old avatar if exist
        if(user.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id)
        }

        // Upload local file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "avatars",
            resource_type: "image",
        })

        // Delete local file after upload
        fs.unlinkSync(req.file.path);

        // save cloudinary data
        user.avatar = {
            url: result.secure_url,         // cloudinary url
            public_id: result.public_id,      // cloudinary public_id
        };

        await user.save();

        res.json({
            message: "Avatar updated",
            avatar: user.avatar,
        });
    } catch(error) {
        console.error("UPLOAD AVATAR ERROR:", error);
        // Safety cleanup
        if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ message: "Avatar upload failed" });
    }
}