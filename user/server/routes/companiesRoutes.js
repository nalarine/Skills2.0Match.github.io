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
} from "../controllers/companiesController.js";
import userAuth from "../middlewares/authMiddleware.js";
import { deleteUser } from "../controllers/userController.js";

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
