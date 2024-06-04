import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";
import { sendVerificationEmail } from "../emailServiceCompany.js";
import { sendForgotPasswordEmail } from "../sendVerificationEmailCompany.js"
import { v4 as uuidv4 } from 'uuid';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  //validate fields
  if (!name) {
    next("Company Name is required!");
    return;
  }
  if (!email) {
    next("Email address is required!");
    return;
  }
  if (!password) {
    next("Password is required and must be greater than 6 characters");
    return;
  }

  try {
    const accountExist = await Companies.findOne({ email });

    if (accountExist) {
      next("Email Already Registered. Please Login");
      return;
    }

    // Create a new account
    const company = await Companies.create({
      name,
      email,
      password, 
    });

    // Generate unique verification token
    const verificationToken = uuidv4();

    // Save verification token temporarily (consider storing in a separate collection)
    company.verificationToken = verificationToken;
    await company.save();

    // Send verification email
    await sendVerificationEmail(company);

    // user token
    const token = company.createJWT();

    res.status(201).json({
      success: true,
      message: "Company Account Created Successfully",
      user: {
        _id: company._id,
        name: company.name,
        email: company.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export async function verifyEmail(verificationToken) {
  try {
    // Check if the verification token is provided
    if (!verificationToken) {
      throw new Error("Verification token is missing");
    }

    // Query the database to find the user with the provided verification token
    const company = await Companies.findOne({ verificationToken });

    // Check if the user exists
    if (!company) {
      throw new Error("User not found or verification token is invalid");
    }

    // Log the user object found based on the verification token
    console.log("User found for verification:", company);

    // Update the user's email verification status to true and clear the verification token
    company.verified = true;
    await company.save();

    // Log the updated user object
    console.log("User email verification updated successfully:", company);

    // Return success and the updated user object
    return { success: true, company };
  } catch (error) {
    // Log any errors that occurred during the verification process
    console.error("Error verifying email:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
}


export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provide user credentials" });
    }

    const company = await Companies.findOne({ email }).select("+password");

    if (!company) {
      return res.status(404).json({ message: "Email is not yet registered" });
    }

    // Check if email is verified
    if (!company.verified) {
      return res.status(401).json({ message: "Email not verified. Please check your email to verify your account." });
    }

    // Compare password
    const isMatch = await company.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    company.password = undefined;

    const token = company.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user: company,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Import necessary modules and dependencies
export const resetPassword = async (req, res, next) => {
  const { email, newPassword, token } = req.body;

  try {
    let company;

    // Check if token is provided
    if (token) {
      // Find the user by reset password token
      company = await Companies.findOne({ resetPasswordToken: token });
      if (!company) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
      // Invalidate the reset password token
      company.resetPasswordToken = null;
    } else {
      // Check if email exists
      company = await Companies.findOne({ email });
      if (!company) {
        return res.status(404).json({ message: 'User not found' });
      }
    }

    // Update user's password
    company.password = newPassword;
    await company.save();

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
    const company = await Companies.findOne({ email });
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    // Generate a unique token for the user
    const resetPasswordToken = uuidv4();
    // Associate the token with the user's account
    company.resetPasswordToken = resetPasswordToken;
    await company.save();
    // Send the reset password email
    await sendForgotPasswordEmail(company);
    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = req.body;

  try {
    // validation
    if (!name || !location || !about || !contact || !profileUrl) {
      next("Please Provide All Required Fields");
      return;
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const updateCompany = {
      name,
      contact,
      location,
      profileUrl,
      about,
      _id: id,
    };

    const company = await Companies.findByIdAndUpdate(id, updateCompany, {
      new: true,
    });

    const token = company.createJWT();

    company.password = undefined;

    res.status(200).json({
      success: true,
      message: "Company Profile Updated SUccessfully",
      company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateCompanyApplicant = async (req, res, next) => {
  // fullName: `${user.firstName} ${user.lastName}`,
  // id: `${applicantId}-${job._id}`,
  // user,
  // jobRole: job.jobTitle,
  // appliedDate: new Date(new Date().setHours(0,0,0)),
  // hiringStage: "Pending",
  // resume: attachmentURL

  const { company_id } = req.params;
  const { id, hiringStage } = req.body;
  const validHiringStages = ['Pending', 'Hired', 'Declined', 'Shortlisted'];

  try {
    // validation
    if (!id || !hiringStage) {
      next("Please Provide All Required Fields");
      return;
    }

    if (!validHiringStages.includes(hiringStage)) {
      next("Please input valid hiring stage");
      return;  
    }

    const company = await Companies.findById(company_id);
    if (!company) 
      return res.status(400).json({ message: "Invalid company." });

    company.applicants = company.applicants.map(v => {
      if (v.id == id) {
        v.hiringStage = hiringStage
      }
      return v
    })

    const updatedCompanyApplicant = await Companies.findByIdAndUpdate(company_id, company, { new: true });

    if (!updatedCompanyApplicant) {
      return res.status(404).json({ message: "Company Applicant not found" });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated applicant",
      data: updatedCompanyApplicant
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getCompanyProfile = async (req, res, next) => {
  try {
    const id = req.body.user.userId;

    const company = await Companies.findById({ _id: id });

    if (!company) {
      return res.status(200).send({
        message: "Company Not Found",
        success: false,
      });
    }

    company.password = undefined;
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//GET ALL COMPANIES
export const getCompanies = async (req, res, next) => {
  try {
    const { search, sort, location } = req.query;

    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = Companies.find(queryObject).select("-password");

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-name");
    }

    // PADINATIONS
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // records count
    const total = await Companies.countDocuments(queryResult);
    const numOfPage = Math.ceil(total / limit);
    // move next page
    // queryResult = queryResult.skip(skip).limit(limit);

    // show mopre instead of moving to next page
    queryResult = queryResult.limit(limit * page);

    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//GET  COMPANY JOBS
export const getCompanyJobListing = async (req, res, next) => {
  const { search, sort } = req.query;
  const id = req.body.user.userId;

  try {
    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;
    //sorting || another way
    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });
    const companies = await queryResult;

    res.status(200).json({
      success: true,
      companies,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// GET SINGLE COMPANY
export const getCompanyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const company = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: {
        sort: "-_id",
      },
    });

    if (!company) {
      return res.status(200).send({
        message: "Company Not Found",
        success: false,
      });
    }

    company.password = undefined;

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const allCompanies = async (req, res, next) => {
  try {
    // Fetch all companies from the database
    const allCompanies = await Companies.find().select("-password");

    // Return the list of companies
    res.status(200).json({
      success: true,
      data: allCompanies,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createCompany = async (req, res, next) => {
  const { name, email, contact, about, password } = req.body;

  try {
    // Validation
    if (!name || !email || !contact || !about || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    // Create a new company
    const company = await Companies.create({
      name,
      email,
      contact,
      about,
      password, // Include the password field in the creation
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: company,
    });
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const editCompany = async (req, res, next) => {
  const { id } = req.params; // Get the company ID from the request parameters
  const { name, email, contact, about} = req.body;

  try {
    // Validation
    if (!name || !email || !contact || !about) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    // Check if the company with the given ID exists
    const existingCompany = await Companies.findById(id);

    if (!existingCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Update the company details
    existingCompany.name = name;
    existingCompany.email = email;
    existingCompany.contact = contact;
    existingCompany.about = about;


    // Save the updated company details
    const updatedCompany = await existingCompany.save();

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const deleteCompany = async (req, res, next) => {
  const { id } = req.params; // Get the company ID from the request parameters

  try {
    // Check if the company with the given ID exists
    const existingCompany = await Companies.findById(id);

    if (!existingCompany) {
      return res.status(404).json({ success: false, message: "Company not found" });
    }

    // Delete the company
    await Companies.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const deleteAccount = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const company = await Companies.findOne({ email });
    if (!company) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if provided password matches user's password
    const isPasswordValid = await company.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Remove user document
    await company.deleteOne();

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
    const company = await Companies.findOne({ email: currentEmail });

    if (!company) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user's password
    company.password = newPassword;
    await company.save();

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
    const company = await Companies.findOneAndUpdate({ email: currentEmail }, { email: newEmail });
    if (!company) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, message: 'Email changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


