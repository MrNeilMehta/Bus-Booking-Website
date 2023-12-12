import { useState } from 'react'
import Login from './Login'
import AdminSignup from './AdminSignup'
import AdminLogin from './AdminLogin'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function UserAuth() {
	const [state, setState] = useState('login')
	const [login, setLogin] = useState('active')
	const [signup, setSignup] = useState('')
	return (
		<div
			className='lead-capture-form mt-5'
			style={{ background: 'transparent', color: '#0d6efd' }}
		>
			<div className='buttons'>
				<Button
					style={{ width: '250px', marginRight: '10px', height: '50px' }}
					variant='outline-primary'
					onClick={() => (setState('login'), setLogin('active'), setSignup(''))}
					active={login}
				>
					Login
				</Button>
				<Button
					style={{ width: '250px', marginRight: '10px', height: '50px' }}
					variant='outline-primary'
					className='btn'
					active={signup}
					onClick={() => (setState('signup'), setSignup('active'), setLogin(''))}
				>
					Signup
				</Button>
			</div>
			{state === 'login' ? <AdminLogin /> : <AdminSignup />}
			<p style={{ textAlign: 'center', margin: '40px 0' }}>
				<Link to='/user-login' style={{ fontSize: '16px', color: 'red' }}>
					{' '}
					Are you a user?{' '}
				</Link>
			</p>
		</div>
	)
}
export default UserAuth
