import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => {
        // Enhanced email validation with support for .ph and exclusion of .edu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isPhDomain = value.endsWith(".ph");
  
        // Allow .ph and any valid email address except .edu
        return emailRegex.test(value) && (isPhDomain || !value.endsWith(".edu") || otherValidTLDs.test(value));
      },
      message: '{VALUE} is not a valid email address.'
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least"],
    select: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  contact: { type: String },
  location: { type: String },
  about: { type: String },
  profileUrl: { type: String },
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  applicants: [ { type: Object }],
  application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  createdAt: { type: Date, default: Date.now } // New field for creation date
},
{ timestamps: true }
);

// Middleware to hash password before saving
companySchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
companySchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

//JSON WEBTOKEN
companySchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Companies = mongoose.model("Companies", companySchema);

export default Companies;
