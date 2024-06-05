import Users from "../models/userModel.js";
import { sendVerificationEmail } from "../emailService.js";
import { v4 as uuidv4 } from 'uuid';
import Companies from "../models/companiesModel.js";
import { sendForgotPasswordEmail } from "../sendVerificationEmail.js"

export const register = async (req, res, next) => {
  const { firstName, lastName, email, password, role, birthdate } = req.body;

  if (!firstName || !lastName || !email || !password || !birthdate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the email is already registered as a user
    const userExist = await Users.findOne({ email });
    // Check if the email is already registered as a company
    const companyExist = await Companies.findOne({ email });

    if (userExist || companyExist) {
      return res.status(400).json({ message: "Email address already exists" });
    }

    const today = new Date();
    const minDate = new Date(today.getFullYear() - 24, today.getMonth(), today.getDate());
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const userBirthdate = new Date(birthdate);

    if (userBirthdate < minDate || userBirthdate > maxDate) {
      return res.status(400).json({ message: "You must be between 18 to 24 years old to register." });
    }

    const verificationToken = uuidv4();

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role,
      birthdate,
      verificationToken,
      emailVerified: false
    });

    await sendVerificationEmail(user);

    const token = await user.createJWT();

    return res.status(201).json({
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
    return res.status(500).json({ message: "Internal Server Error" });
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
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide user credentials" });
    }

    // Check if the user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email not registered" });
    }

    if (!user.emailVerified) {
      return res.status(401).json({ message: "Email not verified" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const userResponse = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      accountType: user.accountType,
      isAdmin: user.isAdmin,
      birthdate: user.birthdate,
    };

    const token = user.createJWT();

    const verificationToken = jwt.sign({ userId: user._id }, 'USAIDPROJECT', { expiresIn: '1h' });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: userResponse,
      verificationToken,
      token,
    });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Import necessary modules and dependencies
export const resetPassword = async (req, res, next) => {
  const { email, newPassword, token } = req.body;

  try {
    let user;

    // Check if token is provided
    if (token) {
      // Find the user by reset password token
      user = await Users.findOne({ resetPasswordToken: token });
      if (!user) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
      // Invalidate the reset password token
      user.resetPasswordToken = null;
    } else {
      // Check if email exists
      user = await Users.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


export const resetPasswordusingEmail = async (req, res) => {
  const { email } = req.body;
  try {
    // Find the user by email address
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Generate a unique token for the user
    const resetPasswordToken = uuidv4();
    // Associate the token with the user's account
    user.resetPasswordToken = resetPasswordToken;
    await user.save();
    // Send the reset password email
    await sendForgotPasswordEmail(user);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const deleteAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if provided password matches user's password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Remove user document
    await user.deleteOne();

    res.status(200).json({ success: true, message: 'Account deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const changePassword = async (req, res) => {
  const { currentEmail, newPassword } = req.body;

  try {
    // Check if email exists
    const user = await Users.findOne({ email: currentEmail });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



export const changeEmail = async (req, res) => {
  const { currentEmail, newEmail } = req.body;

  try {
    // Find user by current email and update email
    const user = await Users.findOneAndUpdate({ email: currentEmail }, { email: newEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'Email changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
