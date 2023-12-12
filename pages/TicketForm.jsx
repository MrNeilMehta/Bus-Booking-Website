// import { useState, useEffect } from "react";
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './ticketForm.css'
import { useLocation, useNavigate } from 'react-router-dom'

const TicketForm = () => {
	const { busId } = useParams()
	const location = useLocation()
	const locationData = location.state
	const navigate = useNavigate()
	const [bus, setBus] = useState({})
	// const bus = {
	//   _id: "644f5236abc5d3cf331c1d4a",
	//   company: "Seeta Travels",
	//   features: "Music, CCTV",
	//   email: "seetatravels@gmail.com",
	//   model: "Mercedes Benz",
	//   ac: true,
	//   busType: "Sleeper 2x1",
	//   rows: 10,
	//   busNumber: "MH01AA0001",
	//   driver: "Rahul",
	//   driverNumber: 1231231230,
	//   baseCharge: 100,
	//   perKm: 9,
	//   routes: "644e3f54171cdfce2eef2f3e",
	//   pickdate: "2023-05-02T00:00:00.000+00:00",
	//   dropdate: "2023-05-02T00:00:00.000+00:00",
	//   startTime: "11.00 AM",
	//   bookings: [],
	//   seats: 60,
	// };
	// const [src, setSrc] = useState("");
	// const [pickupDate, setPickupDate] = useState("");
	// const [pickupTime, setPickupTime] = useState("");
	// const [dest, setDest] = useState("");
	const [totalPassengers, setTotalPassengers] = useState(0)
	const [passengerDetails, setPassengerDetails] = useState([])
	const [name, setName] = useState('')
	const [age, setAge] = useState('')
	const [gender, setGender] = useState('M')
	const [seatNo, setSeatNo] = useState(-1)
	const email = JSON.parse(window.localStorage.getItem('token')).data.user.email
	// const email = localStorage.getItem("email");
	// const phone = localStorage.getItem("phone");
	const [seats, setSeats] = useState([])
	// const [seats, setSeats] = useState(
	//   Array.from({ length: bus.seats }, (_, idx) => idx)
	// );
	// const seats = Array.from({ length: bus.seats }, (_, idx) => idx);
	const elderlySeatsCount = Math.floor(bus.seats * 0.1)
	const elderlySeats = Array.from({ length: elderlySeatsCount }, (_, idx) => idx)
	const [selectedSeats, setSelectedSeats] = useState([])
	const [occupiedSeats, setOccupiedSeats] = useState([])
	// const occupiedSeats = [25, 2, 4, 7, 6, 15, 9, 17];

	useEffect(() => {
		const getBusDetails = async () => {
			try {
				// const response = await axios.get(
				//   `https://tiaa-server.vercel.app/api/admin/bus/getBus?busId=${encodeURIComponent(
				//     busId
				//   )}`
				// );
				const response = await axios.get(
					`http://localhost:5001/api/admin/bus/getBus?busId=${encodeURIComponent(
						busId,
					)}`,
				)
				const res = response.data
				if (res.status === true) {
					return res.data
				} else {
					console.log('No bus found')
				}
			} catch (err) {
				console.log(err)
			}
		}

		getBusDetails()
			.then((data) => {
				console.log(data)
				const baseCount = data.busType === 'Seater 2x2' ? 4 : 6
				setBus(data)
				setSeats(Array.from({ length: data.rows * baseCount }, (_, idx) => idx))
				setOccupiedSeats(data.bookings)
			})
			.catch((err) => console.log(err))
		// eslint-disable-next-line
	}, [])

	const handleNameChange = (e) => {
		setName(e.target.value)
	}
	const handleAgeChange = (e) => {
		setAge(e.target.value)
		const isElderlySeatSelected = elderlySeats.includes(seatNo)
		if (isElderlySeatSelected && e.target.value < 60) setSeatNo(-1)
	}
	const handleGenderChange = (e) => {
		setGender(e.target.value)
	}
	const handleSeatNoChange = (seat) => {
		const isElderlySeat = elderlySeats.includes(seat)
		const isOccupied = occupiedSeats.includes(seat.toString())
		if (isOccupied) {
			setSeatNo(-1)
		} else if (isElderlySeat) {
			if (age > 59) setSeatNo(seat)
			else setSeatNo(-1)
		} else {
			setSeatNo(seat)
		}
	}
	// const handleSeatClick = (seat) => {
	//   const isOccupied = occupiedSeats.includes(seat);
	//   const isIncluded = selectedSeats.includes(seat);
	//   if (isOccupied) return;
	//   if (!isIncluded) {
	//     setSelectedSeats([...selectedSeats, seat]);
	//   } else {
	//     const newSelected = selectedSeats.filter((s) => s !== seat);
	//     setSelectedSeats(newSelected);
	//   }
	// };

	const handleAdd = (e) => {
		e.preventDefault()
		if (!name || !age || seatNo === -1) {
			console.log('Invalid Details')
			alert('Fill all the details')
			return
		}
		const data = {
			name,
			age,
			gender,
			seatNo: parseInt(seatNo),
		}
		const newPassengerDetails = [...passengerDetails, data]
		const newSeats = [...selectedSeats, seatNo]
		const newPassengerCount = totalPassengers + 1
		setPassengerDetails(newPassengerDetails)
		setTotalPassengers(newPassengerCount)
		setSelectedSeats(newSeats)
		setName('')
		setAge('')
		setGender('M')
		setSeatNo(-1)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const data = {
				email,
				busId,
				src: locationData.src,
				pickupDate: locationData.pickupDate,
				pickupTime: locationData.pickupTime,
				dest: locationData.dest,
				totalFare: locationData.fare * totalPassengers,
				totalPassengers,
				passengerDetails,
			}
			console.log(data)
			const response = await axios.post(
				'http://localhost:5001/api/user/ticket/book',
				data,
			)
			const res = response.data
			if (res.status === true) {
				console.log('Ticket booked successfully')
				navigate('/user-dashboard')
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div style={{ textAlign: 'center' }}>
			<div
				style={{ width: '120%', marginLeft: '-10%', textAlign: 'center' }}
				className='bg-#FFF0DD w-full flex font-main overflow-hidden  '
			>
				<div className='bg-#FFF0DD w-full h-full rounded-l-3xl flex justify-center items-center'>
					<div className='flex flex-col w-1/2 h-1/2'>
						<div className='text-center text-4xl font-bold pb-10 pt-5'>
							Book A Ticket
						</div>
						<div
							style={{ width: '80%' }}
							className='rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8'
						>
							<form>
								<div className='flex mb-6'>
									<div className='mr-5'>
										<label htmlFor='name' className='mb-1 font-bold text-black mr-3'>
											Passenger Name
										</label>
										<input
											type='text'
											name='name'
											id='name'
											className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
											placeholder='Enter Passenger Name'
											value={name}
											onChange={handleNameChange}
											// required
										/>
									</div>
									<div className='ml-5'>
										<label htmlFor='age' className='mb-1 font-bold text-black mr-3'>
											Passenger Age
										</label>
										<input
											type='text'
											name='age'
											id='age'
											className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
											placeholder='Enter Passenger Age'
											value={age}
											onChange={handleAgeChange}
											// required
										/>
									</div>
									<div className='ml-5'>
										<label htmlFor='gender' className='mb-1 font-bold text-black mr-3'>
											Gender
										</label>
										<select
											name='gender'
											id='gender'
											className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
											onChange={handleGenderChange}
										>
											<option value='M'>Male</option>
											<option value='F'>Female</option>
										</select>
									</div>
								</div>
								{/* Start of Bus Section */}
								<div className='Bus'>
									<div className='seats'>
										{seats.map((seat) => {
											const isSelected = selectedSeats.includes(seat)
											const isOccupied = occupiedSeats.includes(seat.toString())
											const isElderly = elderlySeats.includes(seat)
											return (
												<span
													tabIndex='0'
													key={seat}
													className={`seat ${isElderly ? `elderly` : ``} ${
														seatNo === seat || isSelected ? 'selected' : ''
													} ${isOccupied ? `occupied` : ''} `}
													// onClick={() => handleSeatClick(seat)}
													onClick={() => handleSeatNoChange(seat)}
													// disabled={isOccupied.length > 0}
												/>
											)
										})}
									</div>
								</div>
								{/* End of Bus Section */}
								<button
									className='flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold'
									onClick={handleAdd}
								>
									+Add
								</button>
							</form>
						</div>
						<div className='flex flex-row-reverse min-w-full min-h-full my-4'>
							<button
								type='submit'
								className='flex-reverse align border bg-blue rounded-xl w-24 p-2 text-white font-semibold text-xl'
								onClick={handleSubmit}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default TicketForm
