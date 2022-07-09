import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import Video from '../components/Video';
import {
	TextField,
	InputAdornment,
	IconButton,
	OutlinedInput,
	FormControl,
	InputLabel,
	Button,
} from '@mui/material';

const Home = () => {
	const { user, setUser } = useContext(UserContext);
	return (
		<>
			<Video />
			<div className='form_wrap'>
				<div className='form_container'>
					<div className='form_title'>
						<h2>RWH APP</h2>
					</div>
					{!user ? (
						<div className='form_control'>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								size='large'
								margin='normal'
								sx={{ mt: 2, mb: 1 }}
							>
								<Link to='/login'>Login</Link>
							</Button>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								size='large'
								margin='normal'
								sx={{ mt: 2, mb: 1 }}
							>
								<Link to='/register'>register</Link>
							</Button>
						</div>
					) : (
						<div className='form_control'>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								size='large'
								margin='normal'
								sx={{ mt: 2, mb: 1 }}
							>
								<Link to='/dashboard'>Dashboard</Link>
							</Button>
							<Button
								type='submit'
								fullWidth
								variant='contained'
								size='large'
								href='#dologou'
								margin='normal'
								sx={{ mt: 2, mb: 1 }}
							>
								Logout
							</Button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Home;
