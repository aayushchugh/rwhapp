import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../api/user';
import { UserContext } from '../contexts/UserContext';

const Header = props => {
	const history = useNavigate();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = async e => {
		e.preventDefault();
		const res = logout()
			.then(res => {
				// if (!user) {
				//   toast.error("Some error message");
				// }
				setUser(null);
				toast.success(res.message);
				history('/', { replace: true });
			})
			.finally(() => {
				props.setAuthFormSubmit(true);
			});
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						RWH APP
					</Typography>
					<Button color='inherit' onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
