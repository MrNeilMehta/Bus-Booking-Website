const Bus = require("../models/bus");

const addBus = async (req, res) => {
  try {
    let newBus = new Bus(req.body);
    if (req.body.busType == "Seater 2x2") newBus.seats = req.body.rows * 4;
    else newBus.seats = req.body.rows * 6;
    newBus.bookings = [];
    await newBus.save();
    res.status(200).json({
      message: "Bus Added Successfully !",
      status: true,
      data: {
        bus: newBus,
      },
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: false,
    });
  }
};

const getAllBuses = async (req, res) => {
  try {
    var company = req.query.email;
    var bus = await Bus.find({ email: company });
    if (bus.length > 0) {
      var a = [];
      for (let i = 0; i < bus.length; i++) {
        if (bus[i].dropdate >= Date.now()) a.push(bus[i]);
      }
      res.status(200).json({
        message: "You have the following buses !",
        status: true,
        data: a,
      });
      return;
    } else {
      res.status(200).json({
        message: "No buses available !",
        status: false,
        data: {},
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
      status: false,
    });
  }
};

const getBusById = async (req, res) => {
  const busId = req.query.busId;
  try {
    const bus = await Bus.findById(busId);
    if (bus) {
      return res.status(200).send({
        status: true,
        message: "Bus found!",
        data: bus,
      });
    } else {
      return res.status(404).send({
        status: false,
        message: "Bus with given id not found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(400).send({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  addBus,
  getAllBuses,
  getBusById,
};
