import { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import store from '../store/store';
import { updateLoggedIn } from '../store/slices';

export const handleErrors = (errorResponse: AxiosResponse) => {
	if (errorResponse.status === 401) {
		store.dispatch(updateLoggedIn(false));
		localStorage.clear();
		toast.warn('Session Timeout!');
	} else {
		toast.error(errorResponse.data.message);
	}
};
