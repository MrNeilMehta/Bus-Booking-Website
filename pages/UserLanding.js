import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLanding = () => {
	const navigate = useNavigate()
	// const url = "https://tiaa-server.vercel.app/api";
	const url = 'http://localhost:5001/api'
	// console.log(url);

	// const email = JSON.parse(window.localStorage.getItem("token")).data.user.email ;
	// console.log(email);

	const [source, setSource] = useState('')
	const [destination, setDestination] = useState('')
	const [date, setDate] = useState(new Date())
	const [ac, setAc] = useState()
	const [busType, setBusType] = useState('')
	const [res, setRes] = useState({
		data: {
			status: 'true',
			message: '',
		},
	})
	const [bus, setBus] = useState([])
	const [flag, setFlag] = useState(true)
	// const [filter, setFilter] = useState(false);
	const [index, setIndex] = useState()
	const [voucher, setVoucher] = useState('')
	const [fare, setFare] = useState(0)

	const handleSource = (e) => {
		setSource(e.target.value)
	}

	const handleDestination = (e) => {
		setDestination(e.target.value)
	}

	const handleDate = (e) => {
		setDate(e.target.value)
	}
	const handleVoucher = (e) => {
		setVoucher(e.target.value)
	}

	const data = {
		src: source,
		dest: destination,
		date: date,
		ac: ac,
		busType: busType,
	}

	//   const handleClick = () =>{
	//     try{
	//     fetch(`${url}/user-auth/getBus?src=${data.src}&dest=${data.dest}&date=${data.date}`)
	//     .then(response => {
	//       // return response.json();
	//       console.log(response);
	//     })
	//     .then(data => {
	//       setBus(data.data);
	//       console.log(bus);
	//     })
	//     setFlag(true);
	//     alert("Success!");
	//   }
	//   catch(e){
	//     console.log(e);
	//     alert(e);
	//   }
	// }

	const handleClick = async (e) => {
		e.preventDefault()
		console.log(source, destination, date)
		try {
			const data = {
				src: source.trim(),
				dest: destination.trim(),
				date: date,
				ac: ac,
				busType: busType.trim(),
			}
			console.log(data)
			console.log(
				`${url}/user-auth/getBus?src=${encodeURIComponent(
					data.src,
				)}&dest=${encodeURIComponent(data.dest)}&date=${encodeURIComponent(
					data.date,
				)}`,
			)
			const response = await axios.get(
				`${url}/user-auth/getBus?src=${encodeURIComponent(
					data.src,
				)}&dest=${encodeURIComponent(data.dest)}&date=${encodeURIComponent(
					data.date,
				)}`,
			)
			// console.log(response);
			// console.log(response.data);
			setRes(response)
			setBus(response.data.data)
			// console.log(response);
			// console.log(response.data.data);
			setFlag(true)
			// console.log(response);
			alert('Data Successfully Received')
			// setSource("");
			// setDestination("");
			// setDate("");
		} catch (e) {
			alert(e)
			console.log(e)
			// setSource("");
			// setDestination("");
			// setDate("");
		}
	}

	const handleBook = (e) => {
		e.preventDefault()
		let newFare
		if (voucher === 'HAPPYHOLIDAYS') {
			newFare = bus[index].cost * 0.9
			// setFare(newFare);
		} else {
			newFare = bus[index].cost
			// setFare(bus[index].cost);
		}

		setFare(newFare)

		// console.log(bus);
		const data = {
			src: source,
			dest: destination,
			pickupDate: bus[index].pickdate,
			dropdate: bus[index].dropdate,
			pickupTime: bus[index].startTime,
			fare: newFare,
		}
		alert('The new fare is ' + newFare)
		console.log(data)
		navigate(`/ticket/${encodeURIComponent(bus[index]._id)}`, { state: data })
	}

	return (
		<div className='bg-#FFF0DD w-full h-full bg-cover flex font-main '>
			<div className='bg-#FFF0DD bg-cover w-full h-screen px-10 pt-4 ml-10 rounded-l-3xl flex justify-center overflow-scroll'>
				<div className='flex flex-col w-1/2 h-1/2 '>
					<h1 className='text-4xl font-bold text-center'>Search For Buses</h1>
					<div className='py-20 bg-white px-10 mb-4 mt-10 rounded-3xl mx-[-300px] text-center'>
						<form className='bg-#FFF0DD'>
							<input
								type='text'
								placeholder='Source'
								className='bg-offwhite border border-blue h-10 w-[300px] p-3 mx-[1px]'
								onChange={handleSource}
								value={source}
							/>
							<input
								type='text'
								placeholder='Destination'
								className='bg-offwhite border border-blue h-10 w-[300px] p-3 mx-[1px]'
								onChange={handleDestination}
								value={destination}
							/>
							<input
								type='date'
								placeholder='Destination'
								className='bg-offwhite border border-blue h-10 w-[300px] p-3 mx-[1px]'
								onChange={handleDate}
								value={date}
							/>
							<button
								type='submit'
								className='bg-blue text-white mx-[1px] w-[140px] h-10'
								onClick={handleClick}
							>
								Search Buses
							</button>

							{/* <button id="dropdownDefault" data-dropdown-toggle="dropdown" className="bg-blue w-10 h-10 p-2 ml-3 align-bottom" onClick={() => setFilter(!filter)}>
                <svg
                  fill="#FFFFFF"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M3.9 54.9C10.5 40.9 24.5 32 40 32H472c15.5 0 29.5 8.9 36.1 22.9s4.6 30.5-5.2 42.5L320 320.9V448c0 12.1-6.8 23.2-17.7 28.6s-23.8 4.3-33.5-3l-64-48c-8.1-6-12.8-15.5-12.8-25.6V320.9L9 97.3C-.7 85.4-2.8 68.8 3.9 54.9z" />
                </svg>
              </button> */}
						</form>
					</div>
					{flag ? (
						res.data.status ? (
							<>
								<h1 className='text-3xl text-center font-semibold'>
									{res.data.message}
								</h1>
								<div className='w-full'>
									{bus.map((data, i) => (
										<>
											<form
												className='py-10 bg-white px-10 mb-4 mt-10 rounded-3xl'
												onSubmit={handleBook}
											>
												<div>{i + 1}</div>
												<div>Company: {data.company}</div>
												<div>Base Charge: {data.baseCharge}</div>
												<div>Charge per km: {data.perKm}</div>
												<div>Total Charge of your Journey: {data.cost}</div>
												<div>Total Time: {data.totaltime}</div>
												<label>Enter Voucher code: </label>

												<input
													value={voucher}
													className='bg-offwhite border border-blue h-10 w-[300px] p-3 mx-[1px]'
													onChange={handleVoucher}
												/>

												<button
													onClick={() => setIndex(i)}
													type='submit'
													class='mt-5 text-center flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold'
												>
													{' '}
													Book{' '}
												</button>
											</form>
										</>
									))}
									{/* <div className="py-20 bg-white px-10 mb-4 mt-10 rounded-3xl">
            1.
            <div> Company: Seeta Travels </div>
            <div> Base Charge: Rs. 50 </div>
            <div> Charge per km: Rs. 8 </div>
            <div>Your Cost: Rs. 90 </div>
            <button type="submit" class="mt-5 text-center flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold" > Book </button>

          </div>
          <div className="py-20 bg-white px-10 mb-4 mt-10 rounded-3xl">
            1.
            <div> Company: Seeta Travels </div>
            <div> Base Charge: Rs. 50 </div>
            <div> Charge per km: Rs. 8 </div>
            <div>Your Cost: Rs. 90 </div>
            <button type="submit" class="mt-5 text-center flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold" > Book </button>

          </div>
          <div className="py-20 bg-white px-10 mb-4 mt-10 rounded-3xl">
            1.
            <div> Company: Seeta Travels </div>
            <div> Base Charge: Rs. 50 </div>
            <div> Charge per km: Rs. 8 </div>
            <div>Your Cost: Rs. 90 </div>
            <button type="submit" class="mt-5 text-center flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold" > Book </button> */}

									{/* </div> */}
								</div>
							</>
						) : (
							<h1 className='text-3xl text-center font-semibold h-screen'>
								{res.data.message}
							</h1>
						)
					) : (
						<div className='h-screen'></div>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserLanding
