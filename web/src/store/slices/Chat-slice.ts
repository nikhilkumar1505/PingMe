import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Iuser } from '../../types';

interface AppStateProp {
	chats: any[];
	selectedChat: Iuser | null;
}
const initialState: AppStateProp = {
	chats: [],
	selectedChat: null,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		updateChats(state, action: PayloadAction<any>) {
			state.chats = action.payload;
		},
		updateSelectedChats(state, action: PayloadAction<Iuser>) {
			state.selectedChat = action.payload;
		},
	},
});

export const { updateChats, updateSelectedChats } = chatSlice.actions;

export default chatSlice.reducer;
