import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Protected = ({ isLoggedIn, children }) => {
	const navigate = useNavigate();
	const userContext = useContext(UserContext);

	if (userContext.isLoaded && !userContext.isLoggedIn) {
		navigate('/');
	}

	return children;
};

export default Protected;
