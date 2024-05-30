import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companiesModel.js";
import User from "../models/userModel.js";

export const allJobs = async (req, res, next) => {
    try {
        // Fetch all jobs from the database
        const allJobs = await Jobs.find();

        // Return the list of jobs
        res.status(200).json({
            success: true,
            data: allJobs,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editJob = async (req, res, next) => {
    try {
        const {
            jobTitle,
            jobType,
            location,
            salary,
            vacancies,
            experience,
            desc,
            requirements,
        } = req.body;
        const { jobId } = req.params;

        if (
            !jobTitle ||
            !jobType ||
            !location ||
            !salary ||
            !desc ||
            !requirements
        ) {
            return res
                .status(400)
                .json({ message: "Please provide all required fields" });
        }

        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res
                .status(404)
                .json({ message: `Invalid job ID: ${jobId}` });
        }

        const updatedJobData = {
            jobTitle,
            jobType,
            location,
            salary,
            vacancies,
            experience,
            detail: { desc, requirements },
        };

        const updatedJob = await Jobs.findByIdAndUpdate(jobId, updatedJobData, {
            new: true,
        });

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            updatedJob,
        });
    } catch (error) {
        console.error("Error updating job:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createJob = async (req, res, next) => {
    try {
        const {
            jobTitle,
            jobType,
            location,
            jobLocationRegion,
            jobLocationProvince,
            jobLocationCity,
            salary,
            salaryPeriod,
            vacancies,
            experience,
            desc,
            requirements,
            startHiringDate,
            endHiringDate,
        } = req.body;

        if (
            !jobTitle ||
            !jobType ||
            !location ||
            !jobLocationRegion ||
            !jobLocationProvince ||
            !jobLocationCity ||
            !salary ||
            !salaryPeriod ||
            !requirements ||
            !desc ||
            !startHiringDate ||
            !endHiringDate
        ) {
            next("Please Provide All Required Fields");
            return;
        }

        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No Company with id: ${id}`);

        const jobPost = {
            jobTitle,
            jobType,
            location,
            jobLocationRegion,
            jobLocationProvince,
            jobLocationCity,
            salary,
            salaryPeriod,
            vacancies,
            experience,
            detail: { desc, requirements },
            company: id,
            startHiringDate,
            endHiringDate,
        };

        const job = new Jobs(jobPost);
        await job.save();

        //update the company information with job id
        const company = await Companies.findById(id);

        company.jobPosts.push(job._id);
        const updateCompany = await Companies.findByIdAndUpdate(id, company, {
            new: true,
        });

        res.status(200).json({
            success: true,
            message: "Job Posted Successfully",
            job,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const updateJob = async (req, res, next) => {
    try {
        const {
            jobTitle,
            jobType,
            location,
            jobLocationRegion,
            jobLocationProvince,
            jobLocationCity,
            salary,
            salaryPeriod,
            vacancies,
            experience,
            desc,
            requirements,
            startHiringDate,
            endHiringDate,
        } = req.body;
        const { jobId } = req.params;

        if (
            !jobTitle ||
            !jobType ||
            !location ||
            !jobLocationRegion ||
            !jobLocationProvince ||
            !jobLocationCity ||
            !salary ||
            !salaryPeriod ||
            !desc ||
            !requirements ||
            !startHiringDate ||
            !endHiringDate
        ) {
            next("Please Provide All Required Fields");
            return;
        }
        const id = req.body.user.userId;

        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(404).send(`No Company with id: ${id}`);

        const jobPost = {
            jobTitle,
            jobType,
            location,
            jobLocationRegion,
            jobLocationProvince,
            jobLocationCity,
            salary,
            salaryPeriod,
            vacancies,
            experience,
            detail: { desc, requirements },
            startHiringDate,
            endHiringDate,
            _id: jobId,
        };

        await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

        res.status(200).json({
            success: true,
            message: "Job Post Updated SUccessfully",
            jobPost,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const applyJob = async (req, res, next) => {
    try {
        let vacancies, applicantId;
        let {
            application = [], // array of user id of applicant,
            attachmentURL, // Resume link
        } = req.body;
        const { jobId } = req.params;

        if (!application) {
            next("Please Provide All Required Fields");
            return;
        }

        applicantId = application[0];

        const job = await Jobs.findById({ _id: jobId });
        if (!job) return res.status(404).send(`No Company with id: ${id}`);

        if (job.isArchived)
            return res
                .status(400)
                .json({ message: `Job post is already archived.` });

        if (!job.vacancies)
            return res
                .status(400)
                .json({ message: `Job post has no more vacancies.` });

        if (job.application && job.application.length) {
            if (job.application.includes(application[0]))
                return res.status(400).json({
                    message: `You have already applied to this job post.`,
                });
            else application = [...application, ...job.application];
        }

        vacancies = job.vacancies - 1;

        const jobPost = {
            application,
            vacancies,
            _id: jobId,
        };

        await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

        const updatedJob = await Jobs.findById({ _id: jobId });

        //update the company information with job id
        const company = await Companies.findById(updatedJob.company);
        const user = await User.findById(applicantId);

        if (
            (company.applicants || [])
                .map((v) => v.id)
                .includes(`${applicantId}-${job._id}`)
        ) {
            return res.status(400).json({
                message: `You have already applied to this job post.`,
            });
        }

        company.applicants.push({
            fullName: `${user.firstName} ${user.lastName}`,
            id: `${applicantId}-${job._id}`,
            jobPost: updatedJob,
            user,
            jobRole: job.jobTitle,
            appliedDate: new Date(new Date().setHours(0, 0, 0)),
            hiringStage: "Pending",
            resume: attachmentURL,
        });

        // user.applications.push({
        //   companyName: company.name,
        //   jobRole: job.jobTitle,
        //   appliedDate: new Date(new Date().setHours(0,0,0)),
        //   hiringStage: "Pending",
        //   resume: attachmentURL
        // });

        const updatedCompany = await Companies.findByIdAndUpdate(
            updatedJob.company,
            company,
            {
                new: true,
            }
        );

        //   const updatedUser = await User.findByIdAndUpdate(applicantId, user, {
        //   new: true,
        // });

        res.status(200).json({
            success: true,
            message: "Job Application Successful",
            updatedJob,
            updatedCompany,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getJobPosts = async (req, res, next) => {
    try {
        const { sort, page, limit } = req.query;

        let queryObject = {};

        let queryResult = Jobs.find(queryObject).populate({
            path: "company",
            select: "-password",
        });

        // SORTING
        if (sort === "Newest") {
            queryResult = queryResult.sort("-createdAt");
        }
        if (sort === "Oldest") {
            queryResult = queryResult.sort("createdAt");
        }
        if (sort === "A-Z") {
            queryResult = queryResult.sort("jobTitle");
        }
        if (sort === "Z-A") {
            queryResult = queryResult.sort("-jobTitle");
        }

        // Pagination
        const pageNumber = Number(page) || 1;
        const pageSize = Number(limit) || 20;
        const skip = (pageNumber - 1) * pageSize;

        queryResult = queryResult.skip(skip).limit(pageSize);

        const totalJobs = await Jobs.countDocuments(queryObject);
        const numOfPages = Math.ceil(totalJobs / pageSize);

        const jobs = await queryResult;

        res.status(200).json({
            success: true,
            totalJobs,
            data: jobs,
            page: pageNumber,
            numOfPages,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

// export const getJobPosts = async (req, res, next) => {
//     try {
//         const { search, sort, location, jType, exp, user_id } = req.query;
//         const types = jType?.split(","); //full-time,part-time
//         const experience = exp?.split("-"); //2-6

//         const user = await User.findById(user_id);

//         if (!user) return res.status(400).json({ message: "Invalid user id" });

//         let date = new Date();
//         date.setDate(date.getDate() + 1);

//         let queryObject = {
//             startHiringDate: { $lte: new Date(date.setHours(0, 0, 0)) },
//             endHiringDate: { $gte: new Date(new Date().setHours(0, 0, 0)) },
//         };

//         // If user provides skills, include skill matching logic in the query
//         if (user.skills) {
//             const skillQueries = user.skills.split(/\s/).map((skill) => {
//                 return {
//                     "detail.requirements": { $regex: skill, $options: "i" },
//                 };
//             });
//             queryObject.$or = skillQueries;
//         }

//         // If user provides job title, include job title matching logic in the query
//         if (user.jobTitle) {
//             queryObject.$or = queryObject.$or || [];
//             queryObject.$or.push({
//                 jobTitle: { $regex: user.jobTitle, $options: "i" },
//             });
//         }

//         // If neither job title nor skills provided, return an error or handle as appropriate
//         if (!queryObject.$or || queryObject.$or.length === 0) {
//             return res
//                 .status(400)
//                 .json({ message: "Please provide either job title or skills" });
//         }

//         if (location) {
//             queryObject.location = { $regex: location, $options: "i" };
//         }

//         if (jType) {
//             queryObject.jobType = { $in: types };
//         }

//         if (exp) {
//             queryObject.experience = {
//                 $gte: Number(experience[0]) - 1,
//                 $lte: Number(experience[1]) + 1,
//             };
//         }

//         if (search) {
//             const searchQuery = {
//                 $or: [
//                     { jobTitle: { $regex: search, $options: "i" } },
//                     { jobType: { $regex: search, $options: "i" } },
//                     {
//                         "detail.requirements": {
//                             $regex: search,
//                             $options: "i",
//                         },
//                     }, // Match against job requirements
//                     { "detail.desc": { $regex: search, $options: "i" } }, // Match against job description
//                 ],
//             };
//             queryObject = { ...queryObject, ...searchQuery };
//         }

//         let queryResult = Jobs.find(queryObject).populate({
//             path: "company",
//             select: "-password",
//         });

//         // SORTING
//         if (sort === "Newest") {
//             queryResult = queryResult.sort("-createdAt");
//         }
//         if (sort === "Oldest") {
//             queryResult = queryResult.sort("createdAt");
//         }
//         if (sort === "A-Z") {
//             queryResult = queryResult.sort("jobTitle");
//         }
//         if (sort === "Z-A") {
//             queryResult = queryResult.sort("-jobTitle");
//         }

//         // pagination
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 20;
//         const skip = (page - 1) * limit;

//         //records count
//         const totalJobs = await Jobs.countDocuments(queryResult);
//         const numOfPage = Math.ceil(totalJobs / limit);

//         queryResult = queryResult.limit(limit * page);

//         const jobs = await queryResult;

//         res.status(200).json({
//             success: true,
//             totalJobs,
//             data: jobs,
//             page,
//             numOfPage,
//         });
//     } catch (error) {
//         console.log(error);
//         res.status(404).json({ message: error.message });
//     }
// };

export const getJobApplications = async (req, res, next) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            next("Please Provide All Required Fields");
            return;
        }

        const company = await Companies.find({
            applicants: { $elemMatch: { id: { $regex: userId } } },
        });
        //  return res.status(400).json(company)

        const jobApplications = company.map((v) => {
            return {
                companyName: v.name,
                applicants: v.applicants.filter((a) =>
                    a.id ? a.id.includes(userId) : false
                ),
            };
        });

        res.status(200).json({
            success: true,
            message: "Job Application Successful",
            data: jobApplications,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const job = await Jobs.findById({ _id: id }).populate({
            path: "company",
            select: "-password",
        });

        if (!job) {
            return res.status(200).send({
                message: "Job Post Not Found",
                success: false,
            });
        }

        //GET SIMILAR JOB POST
        const searchQuery = {
            $or: [
                { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
                { jobType: { $regex: job?.jobType, $options: "i" } },
            ],
        };

        let queryResult = Jobs.find(searchQuery)
            .populate({
                path: "company",
                select: "-password",
            })
            .sort({ _id: -1 });

        queryResult = queryResult.limit(6);
        const similarJobs = await queryResult;

        res.status(200).json({
            success: true,
            data: job,
            similarJobs,
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const deleteJobPost = async (req, res, next) => {
    try {
        const { id } = req.params;

        await Jobs.findByIdAndDelete(id);

        res.status(200).send({
            success: true,
            messsage: "Job Post Delted Successfully.",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const saveJob = async (req, res) => {
    const { userId, id } = req.body;
    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the job ID is already saved
        if (user.savedJobs.includes(id)) {
            return res.status(200).json({
                success: true,
                message: "Job already saved",
                status: "success",
            });
        }

        // Save the job ID to the savedJobs array
        user.savedJobs.push(id);
        await user.save();

        res.status(200).json({
            success: true,
            message: "Job saved successfully",
            status: "success",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeJob = async (req, res) => {
    const { userId, id } = req.body;
    try {
        // Remove the job ID from the savedJobs array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const index = user.savedJobs.indexOf(id);
        if (index !== -1) {
            user.savedJobs.splice(index, 1);
            await user.save();
            return res.status(200).json({
                success: true,
                message: "Job removed successfully",
                status: "success",
            });
        } else {
            return res.status(404).json({
                message: "Job not found in saved jobs",
                status: "failed",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to fetch saved jobs for a user
export const getSavedJobs = async (req, res) => {
    const { userId } = req.params;
    try {
        // Fetch the user document and populate the savedJobs field
        const user = await User.findById(userId).populate("savedJobs");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user.savedJobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const withdrawApplication = async (req, res) => {
    const { jobId } = req.params;
    const { userId } = req.body;

    try {
        // Log the incoming request for debugging
        console.log(`Withdraw Application Request: jobId=${jobId}, userId=${userId}`);

        // Find the job
        const job = await Jobs.findById(jobId);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        // Ensure the user withdrawing the application is the applicant
        if (!job.applicants || !Array.isArray(job.applicants)) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        const applicantIndex = job.applicants.findIndex(app => app.userId.toString() === userId);

        if (applicantIndex === -1) {
            return res.status(403).json({ message: 'Unauthorized action' });
        }

        // Remove the applicant
        job.applicants.splice(applicantIndex, 1);
        await job.save();

        res.status(200).json({ message: 'Application withdrawn successfully' });
    } catch (error) {
        // Log the error for debugging
        console.error('Error in withdrawApplication:', error);

        res.status(500).json({ message: 'Server error', error });
    }
};
