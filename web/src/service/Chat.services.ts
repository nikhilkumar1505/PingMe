import { NetworkManager } from './network';
import apiConfig from './api.json';
import { HttpMethod } from '../utils/constants';

export class ChatServices {
	static getChats = () => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.GET,
			url: apiConfig.GET_CHATS,
		});
	};

	static sendMessage = ({
		recevierId,
		message,
	}: {
		recevierId: string;
		message: string;
	}) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.POST,
			url: apiConfig.SEND_MESSAGE,
			data: { recevierId, message },
		});
	};

	static getMessages = ({
		conversationId,
		recevierId,
	}: {
		conversationId: string;
		recevierId: string;
	}) => {
		return NetworkManager.getInstance().appRequest({
			method: HttpMethod.GET,
			url: apiConfig.GET_MESSAGE,
			params: { conversationId, recevierId },
		});
	};
}
