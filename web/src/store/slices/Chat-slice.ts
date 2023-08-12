import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ichats, Iuser } from '../../types';

interface AppStateProp {
	chats: Ichats[];
	selectedChat: Ichats | Iuser | null;
}
const initialState: AppStateProp = {
	chats: [],
	selectedChat: null,
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		updateChats(state, action: PayloadAction<Ichats[]>) {
			state.chats = action.payload;
		},
		updateSelectedChats(state, action: PayloadAction<Iuser | Ichats>) {
			state.selectedChat = action.payload;
		},
	},
});

export const { updateChats, updateSelectedChats } = chatSlice.actions;

export default chatSlice.reducer;
