// Importing modules
const Admin = require("../models/admin");
const bcryptjs = require("bcryptjs");
const { removeSensitiveData } = require("../utils/functions");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);
// const { sendEmail, generateotp } = require("../utils/email");
const axios = require("axios");

// const testTwilio = (req, res) => {
//   try {
//     client.messages
//       .create({body: 'Hi there', from: '+15134576207', to: '++919167403295'})
//       .then(message => console.log(message.sid));
//   } catch (error) {
//     console.log(error);
//   }
// }


// Signup
const signup = async (req, res) => {
  try {

    let admin = await Admin.findOne({ email: req.body.email });
    if (admin) {
      res.status(400).json({
        message: "Admin Already Exists!",
        data: {
            admin: admin,
        },
      });
      return;
    }

    let newAdmin = new Admin({
      ...req.body,


    });
    await newAdmin.save();
    const token = await Admin.generatejwt(newAdmin._id);

    newAdmin = removeSensitiveData(newAdmin);
    // Sending a response back
    res.status(201).json({
      message: "Admin Signed Up",
      data: {
        token,
        admin: newAdmin,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Login
const login = async (req, res) => {
  try {
    let admin = await Admin.findOne({ email: req.body.email });

    if (!admin) {
      res.status(404).json({
        status: false,
        data: {},
        message: "Admin not found!",
      });
      return;
    }

    const isMatch = await bcryptjs.compare(req.body.password, admin.password);

    if (!isMatch) {
      res.status(401).json({
        status: false,
        data: {},
        message: "Invalid credentials!",

      });
      return;
    }

    const token = await Admin.generatejwt(admin._id);

    admin = removeSensitiveData(admin);

    res.status(200).json({
      status: true,
      data: {
        token,
        admin
      },
      message: "Admin Verified!",

    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      status: false,
      data: {

      },
    });
  }
};

// Logout
const logout = async (req, res) => {
  try {
    const currentUser = req.user;
    const token = req.token;

    currentUser.tokens = currentUser.tokens.filter((usertoken) => {
      return usertoken.token !== token;
    });

    await currentUser.save();

    res.status(200).json({
      message: "Successfully logged out!",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};






// Exporting modules
module.exports = {
  signup,
  login,
  logout,
};
