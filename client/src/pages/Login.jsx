import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Video from '../components/Video';
import {
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
	Link,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { login } from '../api/user';
import { toast } from 'react-toastify';

import { UserContext } from '../contexts/UserContext';

const Login = props => {
	let history = useNavigate();
	const { user, setUser } = useContext(UserContext);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	let validEmail =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
			email
		);

	const handleLogin = async e => {
		e.preventDefault();
		try {
			const res = await login({ email, password });
			if (res.status !== 'ok') {
				toast.error(res.message);
				return;
			}
			toast.success(res.message);
			setUser(res.userID);
			history('/dashboard', { replace: true });
		} catch (err) {
			toast.error(err.message);
		} finally {
			props.setAuthFormSubmit(true);
		}
	};
	return (
		<>
			<Video />
			<div className='form_wrap'>
				<div className='form_container'>
					<div className='form_title'>
						<h2>login</h2>
						{!user ? <p>not logged in</p> : <p>logged in</p>}
					</div>
					<div className='form_control'>
						<FormControl
							variant='outlined'
							fullWidth
							className='form-control'
							margin='normal'
						>
							<InputLabel>email</InputLabel>
							<OutlinedInput
								label='Email'
								type={email}
								value={email}
								onChange={e => setEmail(e.target.value)}
							/>
						</FormControl>
						<FormControl
							variant='outlined'
							fullWidth
							className='form-control'
							margin='normal'
						>
							<InputLabel>Password</InputLabel>
							<OutlinedInput
								label='Password'
								type={showPassword ? 'text' : 'password'}
								value={password}
								onChange={e => setPassword(e.target.value)}
								endAdornment={
									<IconButton
										edge='end'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
									</IconButton>
								}
							/>
						</FormControl>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							size='large'
							disabled={!email || !password || !validEmail}
							margin='normal'
							sx={{ mt: 2, mb: 1 }}
							onClick={handleLogin}
						>
							Login
						</Button>
					</div>
					<div className='form_footer'>
						<Link href='/register' underline='hover'>
							Have you registered?
						</Link>
						<Link href='/forgotpassword' underline='hover'>
							Forgotton your password?
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
