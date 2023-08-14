import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ichats, Iuser } from '../../types';

interface AppStateProp {
	chats: Ichats[];
	selectedChat: Ichats | Iuser | null;
	isTyping: boolean;
}
const initialState: AppStateProp = {
	chats: [],
	selectedChat: null,
	isTyping: false,
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
		updateIsTyping(state, action: PayloadAction<boolean>) {
			state.isTyping = action.payload;
		},
		updateMessageStatus(state, action: PayloadAction<any>) {
			if (state.chats.length > 0) {
				const payload = action.payload;
				state.chats = state.chats?.map((value) => {
					if (value.conversationId === payload?.conversationId) {
						return { ...value, ...payload } as Ichats;
					} else {
						return value;
					}
				});
			}
		},
		updateChatValue(state, action: PayloadAction<any>) {
			let updatedChat: any;
			if (state.chats.length > 0) {
				const payload = action.payload;
				const newChats: Ichats[] = [];
				state.chats?.forEach((value) => {
					if (value.conversationId === payload?.conversationId) {
						updatedChat = { ...value, ...payload } as Ichats;
					} else {
						newChats.push(value);
					}
				});
				state.chats = [updatedChat, ...newChats];
			}
		},
	},
});

export const {
	updateChats,
	updateSelectedChats,
	updateChatValue,
	updateMessageStatus,
	updateIsTyping,
} = chatSlice.actions;

export default chatSlice.reducer;
