import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login, Register, ForgotPassword } from '../pages';

const AuthRoute = () => {
	return (
		<Routes>
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='*' element={<Login />} />
		</Routes>
	);
};

export default AuthRoute;
