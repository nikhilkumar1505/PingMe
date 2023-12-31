import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Iuser } from '../../types';

const initialState: Iuser = {
	avatarId: '',
	username: '',
	fullName: '',
	emailId: '',
	imageUrl: '',
	userId: '',
};

const userSlice = createSlice({
	initialState,
	name: 'user',
	reducers: {
		updateValue(
			state,
			action: PayloadAction<{ key: keyof Iuser; value: string }>
		) {
			state[action.payload.key] = action.payload.value;
		},
		replaceProfile: (state, action: PayloadAction<Iuser>) => action.payload,
		resetprofile: () => initialState,
	},
});

export const { updateValue, resetprofile, replaceProfile } = userSlice.actions;

export default userSlice.reducer;
