import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiConfig from './api.json';
import { handleErrors } from '../utils/errorHandler';

const DEFAULT_TIMEOUT = 30 * 1000;

const appClient = axios.create({
	baseURL: apiConfig.BASEURL,
	timeout: DEFAULT_TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
	},
});

appClient.interceptors.request.use(async (config) => {
	const token = localStorage.getItem('access-token');
	if (token) {
		config.headers!.Authorization = `Bearer ${token}`;
	}
	return config;
});

appClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		handleErrors(error?.response);
		return Promise.reject(error?.response);
	}
);

export class NetworkManager {
	static MyInstance: NetworkManager;

	static getInstance(): NetworkManager {
		if (!NetworkManager.MyInstance) {
			NetworkManager.MyInstance = new NetworkManager();
		}
		return NetworkManager.MyInstance;
	}

	appRequest = async (options: AxiosRequestConfig) => {
		return appClient(options) as Promise<AxiosResponse>;
	};
}
