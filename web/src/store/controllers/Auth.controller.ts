import { AuthServices } from '../../service/Auth.service';
import {
	forgetPasswordProp,
	loginProp,
	registerProp,
	verifyOtpProp,
} from '../../types';
import { setToken } from '../../utils/user';
import { updateLoading, updateLoggedIn } from '../slices';
import store from '../store';

export const login = async (payload: loginProp) => {
	try {
		const res = await AuthServices.login(payload);
		if (res.status === 200) {
			setToken(res.data?.token);
			store.dispatch(updateLoggedIn(true));
		}
	} catch {}
};

export const register = async (payload: registerProp) => {
	try {
		const res = await AuthServices.register(payload);
		if (res.status === 201) {
			setToken(res.data?.token);
			store.dispatch(updateLoggedIn(true));
		}
	} catch {}
};

export const checkEmailExits = async (payload: { emailId: string }) => {
	try {
		const res = await AuthServices.checkmailExists(payload);
		return !!res?.data?.exists;
	} catch {}
};

export const sendOtp = async (payload: { emailId: string }) => {
	try {
		return await AuthServices.sendOtp(payload);
	} catch {}
};

export const verifyOtp = async (payload: verifyOtpProp) => {
	try {
		return await AuthServices.verifyOtp(payload);
	} catch {}
};

export const forgotPassword = async (payload: forgetPasswordProp) => {
	try {
		return await AuthServices.resetPassword(payload);
	} catch {}
};
