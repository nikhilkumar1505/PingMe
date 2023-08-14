import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAvatar, drawerState } from '../../types';
import { Socket } from 'socket.io-client';

interface AppStateProp {
	isLoggedIn: boolean;
	avatars: IAvatar[];
	isloading: boolean;
	drawerState: drawerState;
	socket: Socket | null | any;
	onlineUsers: { [key: string]: string };
}
const initialState: AppStateProp = {
	isLoggedIn: false,
	isloading: false,
	avatars: [],
	drawerState: drawerState.CHAT,
	socket: null,
	onlineUsers: {},
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
		intializeSocket(state, action: PayloadAction<Socket>) {
			state.socket = action.payload;
		},
		updateOnlineUser(state, action: PayloadAction<{ [key: string]: string }>) {
			state.onlineUsers = action.payload;
		},
	},
});

export const {
	updateOnlineUser,
	updateLoggedIn,
	storeAvatars,
	updateLoading,
	updateDrawerState,
	intializeSocket,
} = appSlice.actions;

export default appSlice.reducer;
