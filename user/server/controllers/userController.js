import mongoose from "mongoose";
import Users from "../models/userModel.js";

export const allUsers = async (req, res, next) => {
    // Enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Users.countDocuments();

    try {
        const users = await Users.find()
            .sort({ createdAt: -1 })
            .select('-password');

        const modifiedUsers = users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role // Include user's role
        }));

        const paginatedUsers = modifiedUsers.slice(pageSize * (page - 1), pageSize * page);

        res.status(200).json({
            success: true,
            data: {
                users: paginatedUsers,
                page,
                pages: Math.ceil(count / pageSize),
                count
            }
        });
    } catch (error) {
        next(error);
    }
};



export const updateUser = async (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        contact,
        location,
        profileUrl,
        jobTitle,
        about,
    } = req.body;

    try {
        if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send(`No User with id: ${id}`);
        }

        const updateUser = {
            firstName,
            lastName,
            email,
            contact,
            location,
            profileUrl,
            jobTitle,
            about,
            _id: id,
        };

        const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

        const token = user.createJWT();

        user.password = undefined;

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getUser = async (req, res, next) => {
    try {
        const id = req.body.user.userId;

        const user = await Users.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        user.password = undefined;

        res.status(200).json({ success: true, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
