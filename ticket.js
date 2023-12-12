var nodemailer = require('nodemailer');
const Ticket = require("../models/ticket");
const User = require("../models/user");
const Bus = require("../models/bus");
const Route = require("../models/routes");

const bookTicket = async (req, res) => {
    try {
        const {
            email,
            phone,
            busId,
            src,
            pickupDate,
            pickupTime,
            dest,
            duration,
            totalFare,
            totalPassengers,
            passengerDetails,
        } = req.body;
        const userObj = await User.findOne({ email:email });
        const busObj = await Bus.findById(busId);
        if (!userObj || !busObj) {
            return res.status(404).send({
                status: false,
                message: "Invalid user or bus data",
                data: {},
            });
        }
        const route = await Route.findById(busObj.routes);
        if (!route) {
            return res.status(404).send({
                status: false,
                message: "Route data missing",
                data: {},
            });
        }
        const pickUpRouteArr = route.stops.filter((obj) => src in obj);
        const dropRouteArr = route.stops.filter((obj) => dest in obj);
        if (dropRouteArr.length === 0) {
            return res.status(400).send({
                status: false,
                message: "Invalid Destination data",
            });
        }
        var srcArr;
        if (pickUpRouteArr.length === 0) {
            srcArr = [0, 0];
        } else {
            srcArr = pickUpRouteArr[0][src];
        }
        const dur = dropRouteArr[0][dest][0] - srcArr[0];
        const dis = dropRouteArr[0][dest][1] - srcArr[1];
        const ticket = new Ticket({
            user: userObj._id,
            email,
            phone: userObj.phone,
            bookingDate: new Date().toLocaleDateString(),
            busId,
            src,
            pickupDate,
            pickupTime,
            dest,
            duration: dur,
            totalPassengers,
            totalFare,
            passengerDetails,
            route: busObj.routes,
            distance: dis,
            status: "Booked",
        });
        await ticket.save();


        // Sending email
        var transporter = nodemailer.createTransport({
            pool: true,
            host: "smtp.socioknct.tech",
            port: 587,
            secure: false,
            auth: {
              user: process.env.CODEIAL_MAILER_USERNAME,
              pass: process.env.CODEIAL_MAILER_PASSWORD
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        var mailOptions = {
            from: process.env.CODEIAL_MAILER_USERNAME,
            to: email,
            subject: 'Ticket booking confirmation',
            text: `Hi ${userObj.name},\n\n${totalPassengers} ticket/s are booked successfully from ${src} to ${dest} on ${pickupDate.toString().slice(0,10)}\n\nHappy journey !`   
          };
          
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        const selectedSeats = [] .filter((obj) => seatNo in obj);
        for(let i=0;i<ticket.passengerDetails.length;i++) {
            selectedSeats.push(ticket.passengerDetails[i]["seatNo"])
        }
        console.log(selectedSeats)
        busObj.bookings.push(...selectedSeats)
        busObj.seats-=selectedSeats.length
        await busObj.save()

        
        return res.status(201).send({
            status: true,
            message: "Ticket Booked successfully",
            data: ticket,
        });
    } catch (err) {
        res.status(404).send({
            status: false,
            message: err.message,
        });
    }
};

const getTickets = async (req, res) => {
    try {
        const email = req.query.email;
        const tickets = await Ticket.find({ email:email });
        if (tickets.length > 0) {
            return res.status(200).send({
                status: true,
                message: "Your tickets found",
                data: tickets,
            });
        } else {
            return res.status(200).send({
                status: true,
                message: "No tickets found",
                data: [],
            });
        }
    } catch (err) {
        res.status(404).send({
            status: false,
            message: err.message,
        });
    }
};

module.exports = { bookTicket, getTickets };