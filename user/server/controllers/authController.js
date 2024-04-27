import Users from "../models/userModel.js";
import { sendVerificationEmail } from "../emailService.js";
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Validate fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const userExist = await Users.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    // Generate unique verification token
    const verificationToken = uuidv4();

    // Create new user with role and verification token
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      verificationToken, // Save the verification token
      emailVerified: false // Set email verification status to false by default
    });

    // Send verification email
    await sendVerificationEmail(user);

    const token = await user.createJWT();

    // Send success response with both tokens
    res.status(201).json({
      success: true,
      message: "Account created successfully. Please verify your email to log in.",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountType: user.accountType,
      },
      verificationToken,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export async function verifyEmail(verificationToken) {
  try {
    // Check if the verification token is provided
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }

    // Query the database to find the user with the provided verification token
    const user = await Users.findOne({ verificationToken });

    // Check if the user exists
    if (!user) {
      throw new Error("User not found or verification token is invalid");
    }

    // Log the user object found based on the verification token
    console.log("User found for verification:", user);

    // Update the user's email verification status to true and clear the verification token
    user.emailVerified = true;
    user.verificationToken = null;
    await user.save();

    // Log the updated user object
    console.log("User email verification updated successfully:", user);

    // Return success and the updated user object
    return { success: true, user };
  } catch (error) {
    // Log any errors that occurred during the verification process
    console.error("Error verifying email:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

import jwt from 'jsonwebtoken'; // Import jsonwebtoken module

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide user credentials" });
    }

    // Find user by email
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if email is verified
    if (!user.emailVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    user.password = undefined;

    // Generate JWT token
    const token = user.createJWT();

    const verificationToken = jwt.sign({ userId: user._id }, 'USAIDPROJECT', { expiresIn: '1h' });

    // Send success response with JWT token
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        accountType: user.accountType,
      },
      verificationToken,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};