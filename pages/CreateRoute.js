import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateRoute = () => {
    // const navigate = useNavigate();

    // const [company, setCompany] = useState("");
    // const [email, setEmail] = useState("");
    const [src, setSrc] = useState("");
    const [dest, setDest] = useState("");
    const [id, setId] = useState(0);
    const [stopName, setStopName] = useState("");
    const [stopTime, setStopTime] = useState(0);
    const [stopDist, setStopDist] = useState(0);
    const [sendStops, setSendStops] = useState([]);
    const [flag, setFlag] = useState(true);

    // const company = localStorage.getItem("company");
    // const email = localStorage.getItem("email");
    const company = JSON.parse(window.localStorage.getItem('token')).data.admin.company;
    const email = JSON.parse(window.localStorage.getItem('token')).data.admin.email;

   

  

    const url = "https://tiaa-server.vercel.app/api";


    // const handleCompanyChange = (e) => {
    //     setCompany(e.target.value);
    // }
    // const handleEmailChange = (e) => {
    //     setEmail(e.target.value);
    // }
    const handleSrcChange = (e) => {
        setSrc(e.target.value);
    }
    const handleDestChange = (e) => {
        setDest(e.target.value);
    }
    const handleNameChange = (e) => {
        setStopName(e.target.value);
    }
    const handleTimeChange = (e) => {
        setStopTime(e.target.value);
    }
    const handleDistChange = (e) => {
        setStopDist(e.target.value);
    }
    console.log(src);
    const [stops, setStops] = useState([]);
    const addStop =(e) => {
        

        e.preventDefault();
        setId(id+1);
        const newStops = {
            id: id,
            name: stopName,
            time: stopTime,
            dist: stopDist
        }
        // setStops({...stops, ...newStops});
    
        setStops([...stops, newStops])
         setSendStops([...sendStops, {
            [stopName]: [stopTime, stopDist]
         }])
        setStopName("");
        setStopTime("");
        setStopDist("");

    }

    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(company, email, src, dest, stops);
       
        console.log(sendStops)
        try{
        const data = {
            company: company,
            email: email,
            src: src,
            dest: dest,
            stops: sendStops
            
        }
        console.log(data);
        const res = await axios.post(`${url}/admin/routes/addRoute`, data);
        console.log(res.data);
        alert("Successfullt Sent Data!!");
        // setCompany("");
        // setEmail("");
        setSrc("");
        setDest("");
        setStopName("");
        setStopTime("");
        setStopDist("");
        setFlag(false)
    }
    catch (e) {
        console.log(e);
        console.log(company, email, src, dest, stops);
        alert("Error: " + e.message);
        // setCompany("");
        // setEmail("");
        setSrc("");
        setDest("");
        setStopName("");
        setStopTime("");
        setStopDist("");
    }
        

    }




  return (
    <>
        <div className='bg-blue w-full h-[100%] flex font-main overflow-visible'>
        <div className="bg-lightblue w-full h-full px-10 pt-4 ml-10 rounded-l-3xl flex justify-center items-center">
            <div className="flex flex-col w-1/2 h-1/2 ">
                <div className="text-center text-4xl font-bold pb-10 pt-5">Create Route</div>
                <div className="container rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8">
                    <form>
                        <div className="flex flex-col min-w-full min-h-full mb-6">
                            <label className="mb-1 font-bold text-left">Company: </label>
                            <div className="flex flex-row">
                                {/* <input value={company} type='text' name='company' className="bg-offwhite rounded-xl border border-redbus bg- w-56 p-1" onChange={handleCompanyChange}/> */}
                                {company}
                            </div>
                        </div>
                        <div className="flex flex-col min-w-full min-h-full mb-6">
                            <label className="mb-1 font-bold text-black text-left">Email ID: </label>
                            <div className="flex flex-row flex-wrap">
                            {/* <input
                            value={email}
                            type='email'
                            name='email'
                            className="bg-offwhite rounded-xl border border-redbus w-48 focus:outline-none pl-4 py-1" 
                            onChange={handleEmailChange}/>                             */}
                            {email}
                            </div>
                        </div>
                        </form>
                        </div>
                        <div className=" rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8">
                        <form>
                        <div className="flex mb-6">
                            <div className="mr-5">
                                <label className="mb-1 font-bold text-black mr-3">Source:</label>
                                <input value={src} type='text' name='src' className="bg-offwhite rounded-xl border border-redbus w-56 p-1" onChange={handleSrcChange}/>
                            </div>
                            <div className="ml-5">
                                <label className="mb-1 font-bold text-black mr-3">Destination:</label>
                                <input value={dest} type='text' name='dest' className="bg-offwhite rounded-xl border border-redbus w-56 p-1" onChange={handleDestChange}/>
                            </div>
                        </div>
                        </form>
                        </div>
                        <div className=" rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8">
                        <h1 className='text-2xl font-bold my-3'> Stops: </h1>
                        <form>
                        <div>
                        {    flag?
                        stops && stops.map((stops, i) => (
                            <div key = {i} className="flex flex-col min-w-full min-h-full mb-6 text-left">
                                Stop {stops.id + 1} <br />
                                Stop Name: {stops.name} <br />
                                Time to Reach from Source (in minutes): {stops.time} <br />
                                Distance from Source (in km): {stops.dist} <br />
                            </div>

                        ))
                        
                       : <div></div>}
                        
                        </div>
                        <div className="flex flex-col min-w-full min-h-full mb-6">
                            <label className="mb-1 font-semibold text-black ">Stop Name: </label>
                            <div className="flex flex-row flex-wrap">
                                <input value={stopName} type='text' name='name' className="rounded-xl border border-redbus bg-offwhite w-96 p-1 mb-4" onChange={handleNameChange}/>
                            </div>
                            <label className="mb-1 font-semibold text-black">Time to Reach from Source (in minutes): </label>
                            <div className="flex flex-row flex-wrap">
                                <input value={stopTime} type='number' name='time' className="rounded-xl border border-redbus bg-offwhite w-96 p-1 mb-4" onChange={handleTimeChange}/>
                            </div>
                            <label className="mb-1 font-semibold text-black">Distance from Source (in km): </label>
                            <div className="flex flex-row flex-wrap">
                                <input value={stopDist} type='number' name='distance' className="rounded-xl border border-redbus bg-offwhite w-96 p-1 mb-4" onChange={handleDistChange}/>
                            </div>

                            <button className='flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold' onClick={addStop}>+Add</button>
                        </div>
                        </form> 
                        </div>
                        <div className="flex flex-row-reverse min-w-full min-h-full my-4">
                            <button type="submit" className="flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold" onClick={handleSubmit}>Submit</button>
                        </div>
                    
                
            </div>
        </div>
    </div>
      
    </>
  )
}

export default CreateRoute
