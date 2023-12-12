import { Box, Button, IconButton, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import { mockTransactions } from '../../data/mockData'
import Header from '../../components/Header'
import BarChart from '../../components/BarChart'
import viewRoutes from '../admin-routes/viewroutes'
import ViewRoute from '../admin-routes/viewroutes'
import ViewBuses from '../admin-bus/viewbus'

const Dashboard = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)

	return (
		<Box m='20px'>
			{/* HEADER */}
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Header title='DASHBOARD' subtitle='Welcome to your dashboard' />
			</Box>

			{/* GRID & CHARTS */}
			<Box
				display='grid'
				gridTemplateColumns='repeat(12, 1fr)'
				gridAutoRows='140px'
				gap='20px'
			>
				{/* ROW 2 */}
				<Box
					gridColumn='span 6'
					gridRow='span 2'
					backgroundColor={colors.primary[400]}
				>
					<Box
						mt='25px'
						p='0 30px'
						display='flex '
						justifyContent='space-between'
						alignItems='center'
					></Box>
					<Box height='300px' m='-20px 0 0 0'>
						<BarChart />
					</Box>
				</Box>
				<Box
					gridColumn='span 6'
					gridRow='span 3'
					backgroundColor={colors.primary[400]}
					overflow='auto'
				>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						borderBottom={`4px solid ${colors.primary[500]}`}
						p='15px'
					>
						<Box>
							<ViewBuses />
						</Box>
					</Box>

					{/* {mockTransactions.map((transaction, i) => (

						<Box
							key={`${transaction.txId}-${i}`}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							borderBottom={`4px solid ${colors.primary[500]}`}
							p='15px'
						>
							<Box>
								<Typography
									color={colors.greenAccent[500]}
									variant='h5'
									fontWeight='600'
								>
									{transaction.txId}
								</Typography>
								<Typography color={colors.grey[100]}>{transaction.user}</Typography>
							</Box>
							<Box color={colors.grey[100]}>{transaction.date}</Box>
							<Box
								backgroundColor={colors.greenAccent[500]}
								p='5px 10px'
								borderRadius='4px'
							>
								${transaction.cost}
							</Box>
						</Box>
					))} */}
				</Box>
			</Box>
		</Box>
	)
}

export default Dashboard
