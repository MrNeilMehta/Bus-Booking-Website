// Importing modules
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating the schema
const routeSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/,
                "Invalid email address!",
            ],
        },
        src: {
            type: String,
            required: true
        },
        dest: {
            type: String,
            required: true
        },
        stops: {
            type: [{}],
        }
    }
);

const Route = mongoose.model("Routes", routeSchema);

// Exporting the module
module.exports = Route;
