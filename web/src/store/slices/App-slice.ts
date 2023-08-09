import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAvatar, drawerState } from '../../types';

interface AppStateProp {
	isLoggedIn: boolean;
	avatars: IAvatar[];
	isloading: boolean;
	drawerState: drawerState;
}
const initialState: AppStateProp = {
	isLoggedIn: false,
	isloading: false,
	avatars: [],
	drawerState: drawerState.CHAT,
};

const appSlice = createSlice({
	name: 'app',
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
		updateDrawerState(state, action: PayloadAction<drawerState>) {
			state.drawerState = action.payload;
		},
	},
});

export const {
	updateLoggedIn,
	storeAvatars,
	updateLoading,
	updateDrawerState,
} = appSlice.actions;

export default appSlice.reducer;
