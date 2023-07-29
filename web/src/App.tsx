import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Chat, ForgotPassword, Login, Register } from './pages/';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Chat />} />
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/forgot-password' element={<ForgotPassword />} />
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
