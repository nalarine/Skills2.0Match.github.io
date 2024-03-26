import Users from "../models/userModel.js";

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

    // Create new user with role
    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
      role // Include role when creating user
    });

    // Generate JWT token
    const token = user.createJWT();

    // Exclude password from response
    user.password = undefined;

    // Send success response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
        role: user.role // Include user's role in response
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide user credentials" });
    }

    // Find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // User password is no longer needed in response, so remove it
    user.password = undefined;

    // Create JWT token
    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
        role: user.role // Include the user's role in the response
      },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
