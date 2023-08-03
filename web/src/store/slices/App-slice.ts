import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAvatar } from '../../types';

interface AppStateProp {
	isLoggedIn: boolean;
	avatars: IAvatar[];
	isloading: boolean;
}
const initialState: AppStateProp = {
	isLoggedIn: false,
	isloading: false,
	avatars: [],
};

const appState = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		updateLoggedIn(state, action: PayloadAction<boolean>) {
			state.isLoggedIn = action.payload;
		},
		storeAvatars(state, action: PayloadAction<IAvatar[]>) {
			state.avatars = action.payload;
		},
		updateLoading(state, action: PayloadAction<boolean>) {
			state.isloading = action.payload;
		},
	},
});

export const { updateLoggedIn, storeAvatars, updateLoading } = appState.actions;

export default appState.reducer;
