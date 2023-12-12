// Importing modules
const mongoose = require("mongoose");

// Creating the schema
const busSchema = new mongoose.Schema(
    {
        company: {
            type: String,
            required: true,
            trim: true,
        },
        features: {
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
        model: {
            type: String,
            required: true,
            trim: true,
        },
        ac: {
            type: Boolean,
            default: true
        },
        busType: {
            type: String,
            enum: ['Seater 2x2', 'Sleeper 2x1'],
            default: 'Seater 2x2'
        },
        rows: {
            type: Number,
            trim: true,
        },
        busNumber: {
            type: String,
            required: true,
            trim: true,
        },
        driver: {
            type: String,
            required: true,
            trim: true,
        },
        driverNumber: {
            type: Number,
            trim: true,
        },
        baseCharge: {
            type: Number,
            trim: true,
        },
        perKm: {
            type: Number,
            trim: true,
        },
        routes: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Routes",
            required: true,
        },
        pickdate: {
            type: Date,
            required: true,
        },
        dropdate: {
            type: Date,
            required: true,
        },
        startTime: {
            type : String,
            required: true
        },
        bookings: {
            type : [],
            default: [],
            required: true
        },
        seats: {
            type : Number
        }
    }
);

const Bus = mongoose.model("Bus", busSchema);

// Exporting the module
module.exports = Bus;
