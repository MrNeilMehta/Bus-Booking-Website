import { useState } from 'react'
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import { tokens } from '../../theme'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined'
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'

const Item = ({ title, to, icon, selected, setSelected }) => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	return (
		<MenuItem
			active={selected == title}
			style={{
				color: colors.grey[100],
			}}
			onClick={() => setSelected(title)}
			icon={icon}
		>
			<Typography>{title}</Typography>
			<Link to={to} />
		</MenuItem>
	)
}

const Sidebar = () => {
	const theme = useTheme()
	const colors = tokens(theme.palette.mode)
	const [isCollapsed, setIsCollapsed] = useState(0)
	const [selected, setSelected] = useState('Dashboard')

	return (
		<Box
			sx={{
				'& .pro-sidebar-inner': {
					background: '#FFE2D0 !important',
					// background:
					// 	(window.localStorage.getItem('admin') === null ||
					// 		window.localStorage.getItem('admin') !== true) &&
					// 	'#FFE2D0 !important',
					// background: `${colors.primary[400]}`,
				},
				'& .pro-icon-wrapper': {
					backgroundColor: 'transparent !important',
				},
				'& .pro-inner-item': {
					padding: '5px 35px 5px 20px !important',
				},
				'& .pro-inner-item:hover': {
					color: '#868dfb !important',
				},
				'& .pro-menu-item.active': {
					color: '#6870fa !important',
				},
			}}
			style={{ height: '100vh', backgroundColor: '#FFB085 ' }}
		>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape='square'>
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => {
							if (isCollapsed == 1) setIsCollapsed(0)
							else setIsCollapsed(1)
							console.log(JSON.parse(window.localStorage.getItem('token')))
						}}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						style={{
							margin: '10px 0 20px 0',
							color: colors.grey[100],
						}}
					>
						{!isCollapsed && (
							<Box
								display='flex'
								justifyContent='space-between'
								alignItems='center'
								ml='15px'
							>
								<Typography variant='h2' color={colors.grey[100]}>
									QuickBus
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box mb='25px'>
							{/* <Box display='flex' justifyContent='center' alignItems='center'>
								<img
									alt='profile-user'
									width='100px'
									height='100px'
									src={`../../assets/user.png`}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Box> */}
							<Box textAlign='center'>
								<Typography
									variant='h2'
									color={colors.grey[100]}
									fontWeight='bold'
									sx={{ m: '10px 0 0 0' }}
								>
									{window.localStorage.getItem('admin')
										? JSON.parse(window.localStorage.getItem('token')).data.admin.company
										: JSON.parse(window.localStorage.getItem('token')).data.user.name}
									{/* {JSON.parse(window.localStorage.getItem('token')).data.admin.company} */}
								</Typography>
							</Box>
						</Box>
					)}

					<Box paddingLeft={isCollapsed ? undefined : '10%'}>
						<Typography
							variant='h6'
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Dashboard
						</Typography>
						<Item
							title='Dashboard'
							to={
								window.localStorage.getItem('admin')
									? '/admin-dashboard'
									: '/user-dashboard'
							}
							icon={<HomeOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						<Typography
							variant='h6'
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							{window.localStorage.getItem('admin')
								? 'Add Routes and Buses'
								: 'Buses and Routes'}
						</Typography>
						<Item
							title={window.localStorage.getItem('admin') ? 'Add Buses' : 'Buy Ticket'}
							to={
								window.localStorage.getItem('admin')
									? '/admin-dashboard-addbuses'
									: '/user-dashboard-buy-ticket'
							}
							icon={<ContactsOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						{window.localStorage.getItem('admin') && (
							<Item
								title='Add Routes'
								to='/admin-dashboard-addroutes'
								icon={<ReceiptOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						)}
						<Typography
							variant='h6'
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							View
						</Typography>
						<Item
							title={
								window.localStorage.getItem('admin') ? 'View Buses' : 'View Tickets'
							}
							to={
								window.localStorage.getItem('admin')
									? '/admin-dashboard-viewbuses'
									: '/user-dashboard-viewtickets'
							}
							icon={<ReceiptOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>
						{window.localStorage.getItem('admin') && (
							<Item
								title='View Routes'
								to='/admin-dashboard-viewroutes'
								icon={<ReceiptOutlinedIcon />}
								selected={selected}
								setSelected={setSelected}
							/>
						)}
						<Typography
							variant='h6'
							color={colors.grey[300]}
							sx={{ m: '15px 0 5px 20px' }}
						>
							Pages
						</Typography>
						<Item
							title='Calendar'
							to={
								window.localStorage.getItem('admin')
									? '/admin-dashboard-calendar'
									: '/user-dashboard-calendar'
							}
							icon={<CalendarTodayOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/>

						{window.localStorage.getItem('admin') &&
							((
								<Typography
									variant='h6'
									color={colors.grey[300]}
									sx={{ m: '15px 0 5px 20px' }}
								>
									Charts
								</Typography>
							),
							(
								<Item
									title='Bar Chart'
									to='/admin-dashboard-bar'
									icon={<BarChartOutlinedIcon />}
									selected={selected}
									setSelected={setSelected}
								/>
							))}
						{/* <Item
							title='Geography Chart'
							to='/admin-dashboard-geography'
							icon={<MapOutlinedIcon />}
							selected={selected}
							setSelected={setSelected}
						/> */}
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	)
}

export default Sidebar
