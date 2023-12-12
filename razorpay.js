const Razorpay = require("razorpay");

const razorpay = async (req, res) => {
    try {
        console.log(req.body.totalFare)
        const instance = new Razorpay({
            key_id: "rzp_test_TbyH5PgauccCzL",
            key_secret: "0id2giAvfmipZJSRUZs0VReH",
        });

        const options = {
            amount: req.body.totalFare*100, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_1",
        };
        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}


module.exports = {
    razorpay,
};