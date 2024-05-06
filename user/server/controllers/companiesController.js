import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";
import { response } from "express";

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

    // create a new account
    const company = await Companies.create({
      name,
      email,
      password,
    });

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

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    //validation
    if (!email || !password) {
      next("Please Provide AUser Credentials");
      return;
    }

    const company = await Companies.findOne({ email }).select("+password");

    if (!company) {
      next("Invalid email or Password");
      return;
    }

    //compare password
    const isMatch = await company.comparePassword(password);
    if (!isMatch) {
      next("Invalid email or Password");
      return;
    }
    company.password = undefined;

    const token = company.createJWT();

    res.status(200).json({
      success: true,
      message: "Login SUccessfully",
      user: company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
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
    const newCompany = await Companies.create({
      name,
      email,
      contact,
      about,
      password, // Include the password field in the creation
    });

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: newCompany,
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

