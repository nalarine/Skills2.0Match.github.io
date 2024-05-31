import express, { Router } from "express";
import { rateLimit } from "express-rate-limit";
import {
  getCompanies,
  getCompanyById,
  getCompanyJobListing,
  getCompanyProfile,
  register,
  signIn,
  updateCompanyProfile,
  updateCompanyApplicant,
  allCompanies,
  createCompany,
  editCompany,
  deleteCompany,
  verifyEmail,
} from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";
import { deleteUser } from "../controllers/userController.js";
// Import your email verification function from your email service file
import { sendVerificationEmail } from "../emailServiceCompany.js";

const router = express.Router();

//ip rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// REGISTER
router.post("/register", limiter, register);


// Verify email route with verification token
router.get("/verify-email-company/:verificationToken", async (req, res) => {
  try {
    const { verificationToken } = req.params; // Destructure verificationToken directly
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }
    
    // Verify the email using the token
    const { success } = await verifyEmail(verificationToken);

    // Optionally, you can redirect the user to a confirmation page
    if (success) {
      res.redirect("/verification-success-company/" + verificationToken); // Redirect to the success route
    } else {
      res.send("Email verification failed.");
    }
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Verification success route
router.get("/verification-success-company/:verificationToken", async (req, res) => {
  try {
    // Extract the verification token from the URL parameters
    const { verificationToken } = req.params; // Destructure verificationToken directly
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }

    // Verify the email using the token
    const { success, company } = await verifyEmail(verificationToken);

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


// LOGIN
router.post("/login", limiter, signIn);



// GET DATA
router.post("/create-company", createCompany);
router.post("/get-company-profile", userAuth, getCompanyProfile);
router.post("/get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/", getCompanies);
router.get("/get-company/:id", getCompanyById);
router.get("/allcompanies", allCompanies);

// UPDATE DATA
router.put("/update-company", userAuth, updateCompanyProfile);
router.put("/edit-company/:id", editCompany);
router.put("/update-company-applicant/:company_id", updateCompanyApplicant);

router.delete("/delete/:id", deleteCompany);

export default router;
