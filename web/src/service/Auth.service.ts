import { NetworkManager } from './network';
import apiConfig from './api.json';
import { HttpMethod } from '../utils/constants';
import {
	forgetPasswordProp,
	loginProp,
	registerProp,
	verifyOtpProp,
} from '../types';

export class AuthServices {
	static login = ({ username, password }: loginProp) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.LOGIN,
			data: { username, password },
		});
	};

	static register = ({
		username,
		avatarId,
		password,
		emailId,
		fullName,
	}: registerProp) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.REGISTER,
			data: { username, avatarId, password, emailId, fullName },
		});
	};

	static checkmailExists = ({ emailId }: { emailId: string }) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.CHECK_EMAIL,
			data: { emailId },
		});
	};

	static sendOtp = ({ emailId }: { emailId: string }) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.SEND_OTP,
			data: { emailId },
		});
	};

	static verifyOtp = ({ emailId, otp }: verifyOtpProp) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.VERIFY_OTP,
			data: { emailId, otp },
		});
	};

	static resetPassword = ({ password, emailId }: forgetPasswordProp) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.FORGOT_PASSWORD,
			data: { password, emailId },
		});
	};
}
