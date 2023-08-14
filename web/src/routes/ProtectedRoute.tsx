import React, { useEffect, useCallback, useState } from 'react';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import { useAppSelector } from '../hooks/useAppSelector';
import { getAvatars, getDetails } from '../store/controllers/User.controller';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getToken } from '../utils/user';
import { updateLoading, updateLoggedIn } from '../store/slices';
import { EmptyResult, PageLoader } from '../components';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
	const [showTabletDiv, setShowTabletDiv] = useState(false);
	const isSignedIn = useAppSelector((state) => state.app.isLoggedIn);
	const isLoading = useAppSelector((state) => state.app.isloading);
	const token = getToken();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const loadUserContents = useCallback(async () => {
		try {
			navigate('/', { replace: true });
			dispatch(updateLoading(true));
			await getDetails();
		} finally {
			setTimeout(() => {
				dispatch(updateLoading(false));
			}, 2500);
			dispatch(updateLoggedIn(true));
		}
	}, []);

	useEffect(() => {
		if (token) {
			loadUserContents();
		} else {
			dispatch(updateLoggedIn(false));
			navigate('/', { replace: true });
		}
	}, [token]);

	useEffect(() => {
		getAvatars();
	}, []);

	useEffect(() => {
		function handleResize() {
			setShowTabletDiv(window.innerWidth < 720);
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	if (showTabletDiv) {
		return (
			<div style={{ height: '100vh', padding: '2rem' }}>
				<EmptyResult
					size='45rem'
					title='We recommend using a desktop browser for this app. Mobile and tablet compatibility is limited.'
					imageUrl='https://img.freepik.com/free-vector/hand-drawn-crm-illustration_23-2149398794.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais'
				/>
			</div>
		);
	}

	if (isLoading) {
		return <PageLoader />;
	}

	if (isSignedIn || token) {
		return <AppRoute />;
	}
	return <AuthRoute />;
};

export default ProtectedRoute;
