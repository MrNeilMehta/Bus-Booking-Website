import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

const ViewRoute = () => {
	const [route, setRoute] = useState([])
	const email = JSON.parse(window.localStorage.getItem('token')).data.admin.email
	const fetchRouteData = () => {
		fetch(
			`https://tiaa-server.vercel.app/api/admin/routes/getAllRoutes?email=${email}`,
		)
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				setRoute(data.data)
			})
	}
	useEffect(() => {
		fetchRouteData()
	}, [])

	const getStops = (route) => {
		var v = JSON.stringify(route)
		var data = []
		for (let i = 1; i < v.length; i++) {
			var temp = route[i]
			if (temp != null) data.push(Object.keys(temp))
		}
		if (data.length > 0) return data.join(' --- ')
		return 'No stops between source and destination'
	}
	return (
		<div className='bg-#fff0dd w-full h-[100%] flex font-main overflow-visible'>
			<div className='bg-#fff0dd w-full h-full rounded-l-3xl flex justify-center items-center'>
				<div className='flex flex-col' style={{ width: '75%' }}>
					<div className='text-center text-4xl font-bold'>View Routes</div>
					{route.length > 0 ? (
						<>
							{route.map((route) => (
								<div className='rounded-2xl text-xl bg-white min-w-full min-h-full p-8 shadow-md mb-8 my-8'>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '50%' }}>
											<label htmlFor='model' className='mb-1 font-bold text-black mr-3'>
												Route Source : {route.src}
											</label>
										</div>
										<div className='ml-5'>
											<label
												htmlFor='routeType'
												className='mb-1 font-bold text-black mr-3'
											>
												Route Destination : {route.dest}
											</label>
										</div>
									</div>
									<div className='flex mb-6'>
										<div className='mr-5' style={{ width: '100%' }}>
											<label
												htmlFor='routeNumber'
												className='mb-1 font-bold text-black mr-3'
											>
												Route Stops : {getStops(route.stops)}
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
									<label
										htmlFor='routeNumber'
										className='mb-1 font-bold text-black mr-3'
									>
										No routes added ! Please add a route to view them
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

export default ViewRoute
