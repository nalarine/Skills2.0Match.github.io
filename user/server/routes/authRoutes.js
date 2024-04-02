import express from "express";
import { rateLimit } from "express-rate-limit";
import { register, verifyEmail, signIn } from "../controllers/authController.js";

// Import your email verification function from your email service file
import { sendVerificationEmail } from "../emailService.js";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});
// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

const router = express.Router();

// Register route with rate limiting
router.post("/register", limiter, async (req, res, next) => {
  try {
    // Call the register controller function
    const result = await register(req, res, next);

    // If registration is successful, send the verification email
    if (result && result.success) {
      await sendVerificationEmail(result.user);
    }

    // Send the result from the register function
    res.json(result);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Verify email route with verification token
router.get("/verify-email/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params; // Destructure verificationToken directly
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }
    
    const result = await verifyEmail(verificationToken);

    // Optionally, you can redirect the user to a confirmation page
    res.redirect("/verification-success/" + verificationToken);
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Verification success route
router.get("/verification-success/:verificationToken", async (req, res) => {
  try {
    // Extract the verification token from the URL parameters
    const { verificationToken } = req.params; // Destructure verificationToken directly
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }

    // Verify the email using the token (pseudocode)
    const user = await verifyEmailWithToken(verificationToken);

    // Check if the user was successfully verified
    if (user) {
      // Render a page indicating successful verification
      res.send("Email verified successfully!");
    } else {
      // Render a page indicating failed verification
      res.send("Email verification failed.");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    // Render a page indicating an error occurred
    res.status(500).send("An error occurred while verifying email.");
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    // Call the signIn controller function
    const result = await signIn(req, res);

    // Send the result from the signIn function
    res.json(result);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


export default router;
