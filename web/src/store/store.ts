import { configureStore } from '@reduxjs/toolkit';
import appState from './slices/App-slice';
import userState from './slices/user-slice';

const store = configureStore({
	reducer: {
		app: appState,
		user: userState,
	},
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
