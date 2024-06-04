import express from "express";
import { rateLimit } from "express-rate-limit";
import { register, verifyEmail, signIn, resetPassword, deleteAccount, changeEmail, changePassword, resetPasswordusingEmail } from "../controllers/authController.js";

// Import your email verification function from your email service file
import { sendVerificationEmail } from "../emailService.js";

// Configure rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the RateLimit-* headers
  legacyHeaders: false, // Disable the X-RateLimit-* headers
});

const router = express.Router();

router.post("/register", limiter, register);
router.post("/login", signIn);

// Verify email route with verification token
router.get("/verify-email/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params; // Destructure verificationToken directly
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }
    
    // Verify the email using the token
    const { success } = await verifyEmail(verificationToken);

    // Optionally, you can redirect the user to a confirmation page
    if (success) {
      res.redirect("/verification-success/" + verificationToken); // Redirect to the success route
    } else {
      res.send("Email verification failed.");
    }
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

    // Verify the email using the token
    const { success, user } = await verifyEmail(verificationToken);

    // Render a page indicating successful or failed verification
    if (success) {
      // Here, you can perform additional actions like updating UI, logging in the user, etc.
      // For simplicity, let's just send a success message
      res.send("Email verified successfully!");
    } else {
      res.send("Email verification failed.");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("An error occurred while verifying email.");
  }
});

router.post('/reset-password/:token', resetPassword);

router.post('/reset-password-using-email', resetPasswordusingEmail);

// Delete Account
router.delete('/delete-account', deleteAccount);

// Change Password
router.put('/change-password', changePassword);

// Change Email
router.put('/change-email', changeEmail);

export default router;
