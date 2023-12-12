import { useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthContext from '../context/AuthContext'
import Button from 'react-bootstrap/esm/Button'

export default function SignUp() {
	const [state, setState] = useState('user')
	const { setLoggedIn, toastSuccess, toastWarning } = useContext(AuthContext)

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [company, setCompany] = useState('')

	const url = 'https://tiaa-server.vercel.app/api'

	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setName('')
		setPhone('')
		setEmail('')
		setPassword('')
		setCompany('')

		console.log('inside admin signup')
		fetch(`${url}/admin-auth/signup`, {
			method: 'POST',
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({
				name,
				company,
				email,
				phone,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data, 'admin registered')
				if (data.status == 'true') {
					toast.success('Singup Successful', toastSuccess)
					setLoggedIn(true)
					window.localStorage.setItem('token', JSON.stringify(data))
					// window.localStorage.setItem('loggedIn', true)
					window.localStorage.setItem('admin', true)
					navigate('/admin-dahboard')
				}
				toast.warn(data.message, toastWarning)
			})
	}

	return (
		<>
			<div className='container'>
				<form className='form' onSubmit={handleSubmit}>
					<h3 style={{ marginTop: '-20px' }}>Admin Signup</h3>

					<div className='mb-2' style={{ marginTop: '-40px' }}>
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
					<div className='mb-2'>
						<label>Company name</label>
						<input
							onChange={(e) => setCompany(e.target.value)}
							type='String'
							className='form-control'
							placeholder='Enter company name'
							value={company}
							required
						/>
					</div>

					<div className='mb-2'>
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

					<div className='mb-2'>
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

					<div className='mb-2'>
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
