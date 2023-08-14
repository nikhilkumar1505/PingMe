import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import appSlice from './slices/App-slice';
import userSlice from './slices/user-slice';
import chatSlice from './slices/Chat-slice';

const store = configureStore({
	reducer: {
		app: appSlice,
		user: userSlice,
		chat: chatSlice,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
