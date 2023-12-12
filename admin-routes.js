const Routes = require('../models/routes')

const addRoute = async (req, res) => {
    try {
        let newRoute = new Routes(req.body);
        await newRoute.save();
        res.status(200).json({
            message: "Route Added Successfully !",
            status: true,
            data: {
                route: newRoute,
            },
        });
    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            status: false
        });
    }
}


const getAllRoutes = async (req, res) => {
    try {
        var company = req.query.email
        var routes = await Routes.find({ email: company });
        if (routes.length>0) {
            res.status(200).json({
                message: "You have the following routes !",
                status: true,
                data: routes,
            });
            return;
        } else {
            res.status(200).json({
              message: "No routes available !",
              status: false,
              data: {},
            });
        }
    }
    catch (err) {
        res.status(400).json({
            message: err.message,
            status: false
        });
    }
}


module.exports = {
    addRoute,
    getAllRoutes,
};