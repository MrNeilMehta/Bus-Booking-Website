import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const ViewBus = () => {
    const [bus, setBus] = useState([])
    const email = JSON.parse(window.localStorage.getItem('token')).data.user.email;
    const fetchBusData = () => {
        fetch(`https://tiaa-server.vercel.app/api/user/ticket/?email=${email}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setBus(data.data)
            })
    }
    // const [r, setR] = useState([])
    // const fetchRouteData = () => {
    //     fetch(`https://tiaa-server.vercel.app/api/admin/routes/getAllRoutes?email=${email}`)
    //         .then(response => {
    //             return response.json()
    //         })
    //         .then(data => {
    //             setR(data.data)
    //         })
    // }
    useEffect(() => {
        fetchBusData()
        // fetchRouteData();
    }, [])
    return (
        <div className="w-full h-[100%] flex font-main overflow-visible">
            <div className="w-full h-full rounded-l-3xl flex justify-center items-center">
                <div className="flex flex-col" style={{width:"75%"}}>
                <div className="text-center text-4xl font-bold">
                    View Booked Tickets
                </div>
            {bus.length > 0 ? 
            <>
                {bus.map(bus => (
                      <div className="rounded-2xl text-xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8">
                        <div className="flex mb-6">
                          <div className="mr-5" style={{width:"50%"}}>
                            <label
                              htmlFor="model"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Booking Date : {String(bus.bookingDate).slice(0,10)}
                            </label>
                          </div>
                          <div className="ml-5">
                            <label
                              htmlFor="busType"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Total Fare : Rs. {bus.totalFare}
                            </label>
                          </div>
                        </div>
                        <div className="flex mb-6">
                          <div className="mr-5" style={{width:"50%"}}>
                            <label
                              htmlFor="busNumber"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Source : {bus.src}
                            </label>
                          </div>
                          <div className="ml-5">
                            <label
                              htmlFor="rows"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Destination : {bus.dest}
                            </label>
                          </div>
                        </div>
                        <div className="flex mb-6">
                          <div className="mr-5" style={{width:"50%"}}>
                            <label
                              htmlFor="busNumber"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Pickup Time : {bus.pickupTime}
                            </label>
                          </div>
                          <div className="ml-5">
                            <label
                              htmlFor="rows"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Trip Duration : {bus.duration} mins
                            </label>
                          </div>
                        </div>
                        <div className="flex mb-6">
                          <div className="mr-5" style={{width:"50%"}}>
                            <label
                              htmlFor="busNumber"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Distance : {bus.distance} km
                            </label>
                          </div>
                          <div className="ml-5">
                            <label
                              htmlFor="rows"
                              className="mb-1 font-bold text-black mr-3"
                            >
                              Number of Tickets : {bus.totalPassengers}
                            </label>
                          </div>
                        </div>
                    </div>
                  ))}
            </>
                : 
            <div>
                <div className="flex mb-6">
            <div className="mr-5" style={{width:"100%"}}>
              <label
                htmlFor="busNumber"
                className="mb-1 mt-5 text-xl font-bold text-black mr-3"
              >
                No tickets booked ! Please book a ticket to view them
              </label>
            </div>
          </div>
      </div>}
        </div>
        </div>
        </div>
    );
};

export default ViewBus;
