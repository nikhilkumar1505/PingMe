import { UserSerivces } from '../../service/User.service';
import { storeAvatars } from '../slices';
import store from '../store';

export const getAvatars = async () => {
	try {
		const res = await UserSerivces.getAvatar();
		if (res?.data) {
			store.dispatch(storeAvatars(res.data.data));
		}
	} catch (err) {}
};
