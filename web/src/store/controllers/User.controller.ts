import { toast } from 'react-toastify';
import { UserSerivces } from '../../service/User.service';
import { Iuser } from '../../types';
import { replaceProfile, storeAvatars } from '../slices';
import store from '../store';

export const getAvatars = async () => {
	try {
		const res = await UserSerivces.getAvatar();
		if (res?.data) {
			store.dispatch(storeAvatars(res.data.data));
		}
	} catch (err) {}
};

export const updateAvatar = async (avatarId: string) => {
	try {
		const res = await UserSerivces.updateAvatar({ avatarId });
		if (res.status === 201) {
			toast.success(res.data.message);
		}
	} catch (err) {}
};

export const getDetails = async () => {
	try {
		const res = await UserSerivces.getDetails();
		if (res.status === 200) {
			const data = res.data.data;
			const payload: Iuser = {
				userId: data._id,
				username: data.username,
				fullName: data.fullName,
				imageUrl: data.avatar?.image_url,
				emailId: data.emailId,
				avatarId: data.avatar._id,
			};
			store.dispatch(replaceProfile(payload));
			return payload;
		}
	} catch {}
};

export const searchUser = async (search: string) => {
	try {
		const res = await UserSerivces.searchUser({ searchTerm: search });
		if (res.status === 200) {
			return [...res.data?.data].map((data) => ({
				userId: data._id,
				username: data.username,
				fullName: data.fullName,
				imageUrl: data.avatar?.image_url,
				emailId: data.emailId,
				avatarId: data.avatar._id,
			}));
		}
		return [];
	} catch {
		return [];
	}
};
