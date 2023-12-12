import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

const ViewBus = () => {
	const [bus, setBus] = useState([])
	const email = JSON.parse(window.localStorage.getItem('token')).data.admin.email
	const fetchBusData = () => {
		fetch(
			`https://tiaa-server.vercel.app/api/admin/bus/getAllBuses?email=${email}`,
		)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setBus(data.data)
			})
	}
	const [r, setR] = useState([])
	const fetchRouteData = () => {
		fetch(
			`https://tiaa-server.vercel.app/api/admin/routes/getAllRoutes?email=${email}`,
		)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setR(data.data)
			})
	}
	useEffect(() => {
		fetchBusData()
		fetchRouteData()
	}, [])
	return (
		<div className='bg-#FFF0DD w-full h-[100%] flex font-main overflow-visible'>
			<div className='bg-#FFF0DD w-full h-full rounded-l-3xl flex justify-center items-center'>
				<div className='flex flex-col' style={{ width: '75%' }}>
					<div className='text-center text-4xl font-bold'>View Buses</div>
					{bus.length > 0 ? (
						<>
							{bus.map((bus) => (
								<div className='rounded-2xl text-xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8'>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label htmlFor='model' className='mb-1 font-bold text-black mr-3'>
												Bus Model : {bus.model}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='busType' className='mb-1 font-bold text-black mr-3'>
												Bus Type : {bus.busType}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Bus Number : {bus.busNumber}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
												No of Rows : {bus.rows}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												AC : {bus.ac.toString()}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
												Driver : {bus.driver}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Driver Contact : {bus.driverNumber}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
												Start Date : {String(bus.pickdate).slice(0, 10)}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Drop Date : {String(bus.dropdate).slice(0, 10)}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
												Start Time : {bus.startTime}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Base Charge : {bus.baseCharge}
											</label>
										</div>
										<div className='ml-5'>
											<label htmlFor='rows' className='mb-1 font-bold text-black mr-3'>
												Charge per km : {bus.perKm}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '100%' }}>
											<label
												htmlFor='busNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Bookings :{' '}
												{bus.bookings.length > 0
													? bus.bookings.join(', ')
													: 'No tickets booked yet'}
											</label>
										</div>
									</div>
								</div>
							))}
						</>
					) : (
						<div>
							<div className='flex mb-6'>
								<div className='mr-5' style={{ width: '100%' }}>
									<label htmlFor='busNumber' className='mb-1 font-bold text-black mr-3'>
										No buses added ! Please add a bus to view them
									</label>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default ViewBus
