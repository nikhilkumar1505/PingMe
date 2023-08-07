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
