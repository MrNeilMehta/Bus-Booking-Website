import React, { Component, useState, useContext } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Button from 'react-bootstrap/esm/Button'

export default function Login() {
	const { loggedIn, setLoggedIn, toastSuccess, toastWarning } =
		useContext(AuthContext)

	const url = 'https://tiaa-server.vercel.app/api'

	const navigate = useNavigate()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [state, setState] = useState('user')

	async function handleSubmit(e) {
		e.preventDefault()
		setEmail('')
		setPassword('')

		console.log(email, password)
		console.log(url)
		fetch(`${url}/user-auth/login`, {
			method: 'POST',
			crossDomain: true,
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data, 'userLoggedIn')
				if (data.status === true) {
					toast.success('Login Successful', toastSuccess)

					// alert('login successful')
					setLoggedIn(true)
					window.localStorage.setItem('token', JSON.stringify(data))
					window.localStorage.setItem('loggedIn', true)
					navigate('/user-dashboard')
					// window.location.href = '../components/Admin/Home/Dashboard'
				} else {
					toast.warn(data.message, toastWarning)
				}
			})
	}

	return (
		<>
			<div className='container'>
				<form className='form' onSubmit={handleSubmit}>
					<h3>User Login</h3>
					<div className='mb-3' style={{ marginTop: '-40px' }}>
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
