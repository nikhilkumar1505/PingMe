import React, { useEffect } from 'react';
import AppRoute from './AppRoute';
import AuthRoute from './AuthRoute';
import { useAppSelector } from '../hooks/useAppSelector';
import { getAvatars } from '../store/controllers/User.controller';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { getToken } from '../utils/user';
import { updateLoggedIn } from '../store/slices';
import PageLoader from '../components/organisim/PageLoader';

const ProtectedRoute = () => {
	const isSignedIn = useAppSelector((state) => state.app.isLoggedIn);
	const isLoading = useAppSelector((state) => state.app.isloading);
	const token = getToken();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (token) {
			dispatch(updateLoggedIn(true));
		} else {
			dispatch(updateLoggedIn(false));
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
