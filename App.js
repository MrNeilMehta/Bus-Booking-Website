import './App.css'
import { useState, useEffect, useContext } from 'react'
import AuthContext, { AuthProvider } from './context/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserDashboard from './components/User/UserDashboard'
import UserProtectedRoute from './components/UserProtectedRoute'
import AdminProtectedRoute from './components/AdminProtectedRoute'
import LoginPageUser from '../src/components/User/Home/LoginPage'
import LoginPageAdmin from '../src/components/Admin/Home/LoginPage'

// import LoginPageUser from "../src/components/User/Home/LoginPage";
// import LoginPageAdmin from "../src/components/Admin/Home/LoginPage";
import UserLanding from '../src/pages/UserLanding'
// import Dashboard from './components/Admin/Home/Dashboard'
import Dashboard from './scenes/dashboard'
import Invoices from './scenes/invoices'
import Contacts from './scenes/contacts'
import Bar from './scenes/bar'
import { ColorModeContext, useMode } from './theme'
import Calendar from './scenes/calendar/calendar'
import CreateRoute from './pages/CreateRoute'
import AddBus from './scenes/admin-bus/addbus'
import ViewBus from './scenes/admin-bus/viewbus'
import AddRoutes from './scenes/admin-routes/addroutes'
import ViewRoutes from './scenes/admin-routes/viewroutes'
import Razorpay from './scenes/razorpay/razorpay'

import ViewUserBus from './scenes/user-bus/viewBus'
import TicketForm from './pages/TicketForm'

function App() {
	// const { loggedIn } = useContext(AuthContext)
	// console.log(loggedIn, 'loggedIn')
	console.log(window.localStorage.getItem('loggedIn'), 'loggedIn')
	console.log(window.localStorage.getItem('admin'))

	const [theme, colorMode] = useMode()
	const [isSidebar, setIsSidebar] = useState(true)

	return (
		<AuthProvider>
			<Routes>
				<Route path='/user-login' element={<LoginPageUser />} />
				<Route path='/admin-login' element={<LoginPageAdmin />} />
				{/* Protected routes for admin dashboard */}
				<Route
					path='/admin-dashboard'
					element={<AdminProtectedRoute Component={Dashboard} />}
				/>
				<Route
					path='/admin-createroute'
					element={<AdminProtectedRoute Component={CreateRoute} />}
				/>

				{/* <Route
					path='/admin-dashboard-team'
					element={<AdminProtectedRoute Component={Team} />}
				/> */}
				<Route
					path='/admin-dashboard-contacts'
					element={<AdminProtectedRoute Component={Contacts} />}
				/>
				<Route
					path='/admin-dashboard-invoices'
					element={<AdminProtectedRoute Component={Invoices} />}
				/>
				<Route
					path='/admin-dashboard-bar'
					element={<AdminProtectedRoute Component={Bar} />}
				/>
				<Route
					path='/admin-dashboard-calendar'
					element={<AdminProtectedRoute Component={Calendar} />}
				/>
				<Route
					path='/admin-dashboard-addbuses'
					element={<AdminProtectedRoute Component={AddBus} />}
				/>
				<Route
					path='/admin-dashboard-viewbuses'
					element={<AdminProtectedRoute Component={ViewBus} />}
				/>
				<Route
					path='/admin-dashboard-addroutes'
					element={<AdminProtectedRoute Component={AddRoutes} />}
				/>
				<Route
					path='/admin-dashboard-viewroutes'
					element={<AdminProtectedRoute Component={ViewRoutes} />}
				/>
				{/* Protected routes for user dashboard */}
				<Route
					path='/user-dashboard'
					element={<UserProtectedRoute Component={UserDashboard} />}
				/>
				<Route
					path='/user-dashboard-buy-ticket'
					element={<UserProtectedRoute Component={UserLanding} />}
				/>
				<Route path='/user-dashboard-razorpay' element={<Razorpay />} />
				<Route
					path='/user-dashboard-viewtickets'
					element={<UserProtectedRoute Component={ViewUserBus} />}
				/>
				<Route
					path='/user-dashboard-calendar'
					element={<UserProtectedRoute Component={Calendar} />}
				/>
				<Route
					path='/user-dashboard-bar'
					element={<UserProtectedRoute Component={Bar} />}
				/>
				<Route
					path='/ticket/:busId'
					element={<UserProtectedRoute Component={TicketForm} />}
				/>
				<Route path='*' element={<LoginPageUser />} />
			</Routes>
		</AuthProvider>
	)
}

export default App
