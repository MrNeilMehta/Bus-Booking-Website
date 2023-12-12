// Importing modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating the schema
const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
        type: String,
        required: true,
        trim: true,
      },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
        "Invalid email address!",
      ],
    },


    phone: {
      type: Number,
      trim: true,
      // minlength: [10, "Invalid number!"],
      // maxlength: [10, "Invalid number!"],
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: [8, "Password too short!"]
    },
  }
);

// Hashing the password
adminSchema.pre("save", async function (next) {
  let currentAdmin = this;
  if (!currentAdmin.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    currentAdmin.password = await bcrypt.hash(currentAdmin.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Generating jwt
adminSchema.statics.generatejwt = async (adminid) => {
  const admin = await Admin.findById(adminid);
  const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
 // user.tokens = user.tokens.concat({ token });
  await admin.save();
  return token;
};

const Admin = mongoose.model("Admin", adminSchema);

// Exporting the module
module.exports = Admin;
