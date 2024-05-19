import mongoose from "mongoose";
import Users from "../models/userModel.js";

export const allUsers = async (req, res, next) => {
  const pageSize = 10; // Set page size to 10 users per page
  const page = Number(req.query.page) || 1; // Get the page number from the query string, default to page 1 if not provided
  const { startDate, endDate } = req.query;

  let query = {};

  if (startDate && endDate) {
    query.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  try {
    const count = await Users.countDocuments(query);

    // Calculate the offset based on the page number and page size
    const offset = (page - 1) * pageSize;

    // Fetch users for the specified page
    const users = await Users.find(query)
      .sort({ createdAt: -1 })
      .select("-password")
      .skip(offset)
      .limit(pageSize);

    const modifiedUsers = users.map((user) => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profileUrl: user.profileUrl,
      role: user.role,
      birthdate: user.birthdate ? new Date(user.birthdate).toLocaleDateString() : "N/A",
      application: user.application,
      createdAt: user.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: {
        users: modifiedUsers,
        page,
        pages: Math.ceil(count / pageSize),
        count,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createUser = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password, // Assuming you also want to create a password
    birthdate,
    createdAt,
  } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new Users({
      firstName,
      lastName,
      email,
      password, // Assuming you also want to create a password
      birthdate,
      createdAt,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract user ID from request parameters
    const {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      birthdate,
      about,
      skills,
    } = req.body; // Extract updated user details from request body

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID and update the details
    const updatedUser = await Users.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        contact,
        location,
        profileUrl,
        jobTitle,
        birthdate,
        about,
        skills,
      },
      { new: true } // Return the updated user
    );

    // Check if user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with the updated user
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id; // Extract user ID from request parameters

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    // Find the user by ID and delete it
    const deletedUser = await Users.findOneAndDelete({ _id: userId });

    // Check if user exists
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with a success message
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    birthdate,
    about,
    skills,
  } = req.body;

  try {
    // if (!firstName || !lastName || !email || !contact || !jobTitle || !about || !skills) {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !contact ||
      !about ||
      !skills
      // !birthdate
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
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
      birthdate,
      about,
      skills,
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