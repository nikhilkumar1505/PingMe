import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './utils/theme';
import ProtectedRoute from './routes/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './store/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<ToastContainer
						theme='colored'
						className={'toastify'}
						autoClose={3000}
					/>
					<ProtectedRoute />
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
}

export default App;
