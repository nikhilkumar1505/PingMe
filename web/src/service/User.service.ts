import { NetworkManager } from './network';
import apiConfig from './api.json';
import { HttpMethod } from '../utils/constants';

export class UserSerivces {
	static getAvatar = () => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.GET,
			url: apiConfig.AVATAR,
		});
	};
	static getDetails = () => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.GET,
			url: apiConfig.GET_DETAILS,
		});
	};
}
