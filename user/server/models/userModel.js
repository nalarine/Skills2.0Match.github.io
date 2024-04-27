import mongoose, { Schema } from "mongoose"; // Import Schema along with mongoose
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
      validate: {
        validator: function(value) {
          return validator.isEmail(value) && /@gmail\.com$/.test(value);
        },
        message: props => `${props.value} is not a valid Gmail address.`
      },
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 characters"],
      validate: {
        validator: function(value) {
          return /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/.test(value);
        },
        message: props => `${props.value} is not a valid password. It should contain at least one digit, one special character, and one uppercase letter.`
      },
      select: true,
    },
    accountType: { type: String, default: "seeker" },
    role: { type: Number, default: 0 },
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    cvUrl: { type: String },
    jobTitle: { type: String },
    about: { type: String },
    skills: { type: String },
    application: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
    emailVerified: { type: Boolean, default: false }, // New field for email verification
    verificationToken: { type: String }, // New field for verification token
    savedJobs: [{ type: Schema.Types.ObjectId, ref: 'Jobs' }],
  },
  { timestamps: true }
);

// Middleware to hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Method to generate JWT
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model("Users", userSchema);

export default Users;
