import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Chat } from '../pages';

const AppRoute = () => {
	return (
		<Routes>
			<Route path='/' element={<Chat />} />
		</Routes>
	);
};

export default AppRoute;
