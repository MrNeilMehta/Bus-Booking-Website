import { useState } from 'react'
import Login from './Login'
import UserSignUp from './UserSignUp'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

function UserAuth() {
	const [state, setState] = useState('login')
	const [login, setLogin] = useState('active')
	const [signup, setSignup] = useState('')

	return (
		<div className="lead-capture-form mt-5" style={{ background:"transparent", color:"#0d6efd" }}>
				<div className='buttons'>
					<Button
						variant='outline-primary'
						onClick={() => (setState('login'), setLogin('active'), setSignup(''))}
						active={login}
						style={{ width: '250px', marginRight: '10px', height: '50px' }}
					>
						Login
					</Button>
					<Button
						variant='outline-primary'
						onClick={() => (setState('signup'), setLogin(''), setSignup('active'))}
						active={signup}
						style={{ width: '250px', marginRight: '10px', height: '50px' }}
					>
						Signup
					</Button>
				</div>
				{state === 'login' ? <Login /> : <UserSignUp />}
				<p style={{ textAlign: 'center', margin: '40px 0', marginTop:"-2px" }}>
					 <Link to='/admin-login' style={{fontSize:"16px", color:"red"}}> Are you an admin? </Link>
				</p>
		</div>
	)
}
export default UserAuth
