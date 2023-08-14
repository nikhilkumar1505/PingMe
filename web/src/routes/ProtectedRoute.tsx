import React, { useEffect, useCallback } from 'react';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import { useAppSelector } from '../hooks/useAppSelector';
import { getAvatars, getDetails } from '../store/controllers/User.controller';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getToken } from '../utils/user';
import { updateLoading, updateLoggedIn } from '../store/slices';
import PageLoader from '../components/organisim/PageLoader';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
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

	if (isLoading) {
		return <PageLoader />;
	}

	if (isSignedIn || token) {
		return <AppRoute />;
	}
	return <AuthRoute />;
};

export default ProtectedRoute;
