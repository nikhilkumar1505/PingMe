import { IAvatar } from '../types';
import { ACCESS_TOKEN } from './constants';

export const getAvatarImageUrl = (avatars: IAvatar[], avatarId: string) => {
	return avatars.find((avatar) => avatar?._id === avatarId);
};

export const setToken = (token: string) => {
	localStorage.setItem(ACCESS_TOKEN, token);
};

export const getToken = () => {
	return localStorage.getItem(ACCESS_TOKEN);
};
