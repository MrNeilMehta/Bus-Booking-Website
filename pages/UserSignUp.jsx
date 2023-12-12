import { useState, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'

export default function SignUp() {
	const { setLoggedIn, toastSuccess, toastWarning } = useContext(AuthContext)
	const [state, setState] = useState('user')

	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const url = process.env.REACT_APP_BACKEND_URL

	const handleSubmit = async (e) => {
		e.preventDefault()

		setEmail('')
		setPassword('')
		setName('')
		setPhone('')

		console.log('inside user signup')
		fetch('https://tiaa-server.vercel.app/api/user-auth/signup', {
			method: 'POST',
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				name,
				email,
				phone,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data, 'userRegistered')
				if (data.status === true) {
					toast.success('Singup Successful', toastSuccess)

					// alert('login successful')
					setLoggedIn(true)
					window.localStorage.setItem('token', JSON.stringify(data))
					window.localStorage.setItem('loggedIn', true)
					navigate('/user-dashboard')
					// window.location.href = '../components/Admin/Home/Dashboard'
				}
				toast.warn(data.message, toastWarning)
			})
	}

	return (
		<>
			<div className='container'>
				<form className='form' onSubmit={handleSubmit}>
					<h3 style={{ marginTop: '-20px' }}>User Signup</h3>
					<div className='mb-3' style={{ marginTop: '-40px' }}>
						<label>Full Name</label>
						<input
							onChange={(e) => setName(e.target.value)}
							type='String'
							className='form-control'
							placeholder='Enter full name'
							value={name}
							required
						/>
					</div>
					<div className='mb-3'>
						<label>Phone Number</label>
						<input
							onChange={(e) => setPhone(e.target.value)}
							type='Phone'
							className='form-control'
							placeholder='Enter phone number'
							value={phone}
							required
						/>
					</div>
					<div className='mb-3'>
						<label>Email address</label>
						<input
							onChange={(e) => setEmail(e.target.value)}
							type='email'
							className='form-control'
							placeholder='Enter email'
							value={email}
							required
						/>
					</div>

					<div className='mb-3'>
						<label>Password</label>
						<input
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							type='password'
							className='form-control'
							placeholder='Enter password'
							required
						/>
					</div>

					<div className='d-grid'>
						<Button type='submit' variant='outline-primary'>
							Submit
						</Button>
					</div>
				</form>
			</div>
			<ToastContainer />
		</>
	)
}
