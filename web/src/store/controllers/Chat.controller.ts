import { ChatServices } from '../../service/Chat.services';
import { Ichats, Imessage } from '../../types';
import store from '../store';

export const getAllChat = async () => {
	try {
		const res = await ChatServices.getChats();
		if (res.status === 200 && res.data?.data?.length > 0) {
			const payload = [...res.data?.data].map((data: any) => ({
				imageUrl: data?.avatarImageUrl,
				fullName: data?.fullName,
				username: data?.username,
				messageStatus: data?.status,
				userSentMessage: data?.isLastMessageByUser,
				message: data?.message,
				messageId: data?.messageId,
				time: data?.time,
				userId: data?.userId,
				conversationId: data?._id,
			}));
			return payload as Ichats[];
		} else {
			return [];
		}
	} catch {
		return [];
	}
};

export const getMessage = async (
	conversationId: string,
	recevierId: string
) => {
	try {
		const res = await ChatServices.getMessages({ conversationId, recevierId });
		if (res.status === 200 && res.data?.data.length > 0) {
			const userId = store.getState().user.userId;
			const payload = [...res.data?.data].map((data) => {
				return {
					messageId: data?._id,
					conversationId: data?.conversationId,
					message: data?.message,
					time: data?.createdAt,
					isUserSentMessage: data?.sender === userId,
					messageStatus: data?.status,
				};
			});
			return payload as Imessage[];
		} else {
			return [];
		}
	} catch {
		return [];
	}
};

export const sendMessage = async (recevierId: string, message: string) => {
	try {
		const res = await ChatServices.sendMessage({ recevierId, message });
		const userId = store.getState().user.userId;
		if (res.status === 200) {
			const data = res.data?.data;
			return {
				messageId: data?._id,
				conversationId: data?.conversationId,
				message: data?.message,
				time: data?.createdAt,
				isUserSentMessage: data?.sender === userId,
				messageStatus: data?.status,
			} as Imessage;
		}
	} catch {}
};

export const sendMessageToBot = async (message: string) => {
	try {
		const res = await ChatServices.sendMessagetoBot({ message });
		if (res.status === 200) {
			const data = res.data?.data;
			return {
				messageId: 'ai-bot',
				message: data,
				time: new Date().toISOString(),
				isUserSentMessage: false,
				messageStatus: 'seen',
			} as Imessage;
		}
	} catch {
		return {};
	}
};
