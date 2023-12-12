import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddBus = () => {
	const [model, setModel] = useState('')
	const [busType, setBusType] = useState('Seater 2x2')
	const [rows, setRows] = useState('')
	const [busNumber, setBusNumber] = useState('')
	const [driver, setDriver] = useState('')
	const [driverNumber, setDriverNumber] = useState('')
	const [baseCharge, setBaseCharge] = useState('')
	const [perKm, setPerKm] = useState('')
	const [routes, setRoutes] = useState('')
	const [pickdate, setPickdate] = useState('')
	const [dropdate, setDropdate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [ac, setAc] = useState(false)
	const [features, setFeatures] = useState('')
	const [userRoutes, setUserRoutes] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const getUserRoutes = async () => {
			try {
				// const email = JSON.parse(window.localStorage.getItem('token')).data.admin.email;
				const email = JSON.parse(window.localStorage.getItem('token')).data.admin
					.email
				const response = await axios.get(
					`https://tiaa-server.vercel.app/api/admin/routes/getAllRoutes?email=${email}`,
				)
				console.log(response.data)
				const res = response.data
				if (res.status === true) {
					return res.data
				} else {
					return []
				}
			} catch (err) {
				console.log(err)
				return []
			}
		}

		getUserRoutes()
			.then((data) => {
				setUserRoutes(data)
				if (data.length > 0) setRoutes(data[0]._id)
			})
			.catch((err) => {
				console.log('Error: ', err)
				setUserRoutes([])
			})
	}, [])

	const handleModelChange = (e) => {
		setModel(e.target.value)
	}
	const handleBusTypeChange = (e) => {
		setBusType(e.target.value)
	}
	const handleRowsChange = (e) => {
		setRows(e.target.value)
	}
	const handleBusNumberChange = (e) => {
		setBusNumber(e.target.value)
	}
	const handleDriverChange = (e) => {
		setDriver(e.target.value)
	}
	const handleDriverNumberChange = (e) => {
		setDriverNumber(e.target.value)
	}
	const handleBaseChargeChange = (e) => {
		setBaseCharge(e.target.value)
	}
	const handlePerKmChange = (e) => {
		setPerKm(e.target.value)
	}
	const handleRoutesChange = (e) => {
		setRoutes(e.target.value)
	}
	const handlePickdateChange = (e) => {
		setPickdate(e.target.value)
	}
	const handleDropdateChange = (e) => {
		setDropdate(e.target.value)
	}
	const handleStartTimeChange = (e) => {
		setStartTime(e.target.value)
	}
	const handleAcChange = (e) => {
		if (e.target.value === 'Yes') setAc(true)
		else setAc(false)
	}
	const handleFeaturesChange = (e) => {
		setFeatures(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const company = JSON.parse(window.localStorage.getItem('token')).data.admin
			.company
		const email = JSON.parse(window.localStorage.getItem('token')).data.admin
			.email
		const data = {
			company,
			email,
			model,
			busType,
			rows,
			busNumber,
			driver,
			driverNumber,
			baseCharge,
			perKm,
			routes,
			pickdate,
			dropdate,
			startTime,
			ac,
			features,
		}
		console.log(data)
		try {
			const response = await axios.post(
				`https://tiaa-server.vercel.app/api/admin/bus/addBus`,
				data,
			)
			const res = response.data
			console.log(res)
			if (res.status === true) {
				navigate('/admin-dashboard-viewbuses')
			}
		} catch (err) {
			console.log('Error occured: ', err)
		}
	}
	return (
		<div className='bg-#fff0dd w-full h-[100%] flex font-main overflow-visible'>
			<div className='bg-#fff0dd w-full h-full rounded-l-3xl flex justify-center items-center'>
				<div className='flex flex-col'>
					<div className='text-center text-4xl font-bold'>Create Bus</div>
					<div className='rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8'>
						<form>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='driver' className='mb-1 font-bold text-black mr-3'>
										Driver Name
									</label>
									<input
										type='text'
										name='driver'
										id='driver'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder="Enter Driver's Name"
										value={driver}
										onChange={handleDriverChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label className='mb-1 font-bold text-black mr-3'>Driver Number</label>
									<input
										type='tel'
										name='driverNumber'
										id='driverNumber'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder="Enter Driver's Contact"
										value={driverNumber}
										onChange={handleDriverNumberChange}
										required
									/>
								</div>
							</div>
						</form>
					</div>
					<div className='rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8'>
						<form>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='model' className='mb-1 font-bold text-black mr-3'>
										Bus Model
									</label>
									<input
										type='text'
										name='model'
										id='model'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Model of Bus'
										value={model}
										onChange={handleModelChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label htmlFor='busType' className='mb-1 font-bold text-black mr-3'>
										Bus Type
									</label>
									<select
										name='busType'
										id='busType'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										onChange={handleBusTypeChange}
									>
										<option value='Seater 2x2'>2X2 Seater</option>
										<option value='Sleeper 2x1'>2X1 Sleeper</option>
									</select>
								</div>
							</div>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='busNumber' className='mb-1 font-bold text-black mr-3'>
										Bus Number
									</label>
									<input
										type='text'
										name='busNumber'
										id='busNumber'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Bus Number'
										value={busNumber}
										onChange={handleBusNumberChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
										No of Rows
									</label>
									<input
										type='text'
										name='rows'
										id='rows'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter No. of Rows'
										value={rows}
										onChange={handleRowsChange}
										required
									/>
								</div>
							</div>
						</form>
					</div>
					{/* SECTION ENDS */}
					<div className='rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8'>
						<form>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='baseCharge' className='mb-1 font-bold text-black mr-3'>
										Base Charge
									</label>
									<input
										type='text'
										name='baseCharge'
										id='baseCharge'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Base Charge'
										value={baseCharge}
										onChange={handleBaseChargeChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label htmlFor='perKm' className='mb-1 font-bold text-black mr-3'>
										Price Per KM
									</label>
									<input
										type='text'
										name='perKm'
										id='perKm'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Price Per KM'
										value={perKm}
										onChange={handlePerKmChange}
										required
									/>
								</div>
							</div>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='busNumber' className='mb-1 font-bold text-black mr-3'>
										Features
									</label>
									<input
										type='text'
										name='features'
										id='features'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Bus Features'
										value={features}
										onChange={handleFeaturesChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
										AC
									</label>
									<select
										name='ac'
										id='ac'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										onChange={handleAcChange}
									>
										<option value='No'>No</option>
										<option value='Yes'>Yes</option>
									</select>
								</div>
							</div>
							{userRoutes.length > 0 ? (
								<div className='flex mb-6'>
									<div className='mr-5'>
										<label htmlFor='routes' className='mb-1 font-bold text-black mr-3'>
											Available Bus Routes
										</label>
										<select
											name='routes'
											id='routes'
											className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
											onChange={handleRoutesChange}
										>
											{userRoutes.map((route) => (
												<option value={route._id} key={route._id}>
													{route.src} - {route.dest}
												</option>
											))}
											{/* <option value="No">No</option>
                      <option value="Yes">Yes</option> */}
										</select>
									</div>
								</div>
							) : (
								<div>No Routes Available</div>
							)}
						</form>
					</div>
					{/* SECTION ENDS */}
					<div className='rounded-2xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8'>
						<form>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='pickdate' className='mb-1 font-bold text-black mr-3'>
										Journey Start Date
									</label>
									<input
										type='date'
										name='pickdate'
										id='pickdate'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Starting Date'
										value={pickdate}
										onChange={handlePickdateChange}
										required
									/>
								</div>
								<div className='ml-5'>
									<label htmlFor='dropdate' className='mb-1 font-bold text-black mr-3'>
										Journey End Date
									</label>
									<input
										type='date'
										name='dropdate'
										id='dropdate'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder='Enter Completion Date'
										value={dropdate}
										onChange={handleDropdateChange}
										required
									/>
								</div>
							</div>
							<div className='flex mb-6'>
								<div className='mr-5'>
									<label htmlFor='startTime' className='mb-1 font-bold text-black mr-3'>
										Journey Start Time
									</label>
									<input
										type='time'
										name='startTime'
										id='startTime'
										className='bg-offwhite rounded-xl border border-redbus w-56 p-1'
										placeholder=' '
										value={startTime}
										onChange={handleStartTimeChange}
										required
									/>
								</div>
							</div>
						</form>
					</div>
					<div className='flex flex-row-reverse min-w-full min-h-full my-4'>
						<button
							type='submit'
							className='flex-reverse align border bg-blue rounded-xl w-24 p-2 font-semibold'
							style={{ background: 'cyan' }}
							onClick={handleSubmit}
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AddBus
