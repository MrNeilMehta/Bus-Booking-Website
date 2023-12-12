import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import axios from "axios";

function Razorpay() {
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }
        const amount = 500;

        const options = {
            key: "rzp_test_TbyH5PgauccCzL", // Enter the Key ID generated from the Dashboard
            amount: (amount*100).toString(),
            currency: "INR",
            name: "QuickBus",
            description: "Test Transaction",
            image: "",
            handler: async function (response) {
                const data = {
                    orderCreationId: 1,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };
            },
            prefill: {
                name: "Bhavik Jain",
                email: "bhavikjain403@gmail.com",
                contact: "9152412545",
            },
            notes: {
                address: "QuickBus",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <button onClick={displayRazorpay} className="flex-reverse align border bg-blue rounded-xl w-auto p-3 font-semibold"
        style={{background:"cyan"}}>
            Book Tickets
        </button>
    );
}

export default Razorpay;