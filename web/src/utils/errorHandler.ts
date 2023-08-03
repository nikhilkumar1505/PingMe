import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import store from '../store/store';
import { updateLoggedIn } from '../store/slices';
import { redirect } from 'react-router-dom';

export const handleErrors = (errorResponse: AxiosResponse) => {
	if (errorResponse.status === 401) {
		store.dispatch(updateLoggedIn(false));
		localStorage.clear();
		toast.warn('Session Timeout!');
		redirect('/');
	} else {
		toast.error(errorResponse.data.message);
	}
};
