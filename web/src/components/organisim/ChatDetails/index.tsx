import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { ChatDeatilsHeader, ChatInput, Conversation, EmptyResult } from '../..';
import { Ichats, Imessage } from '../../../types';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateMessageStatus } from '../../../store/slices';
import store from '../../../store/store';

export const ChatDetails = () => {
	const [messages, setMessage] = useState<Imessage[] | []>([]);
	const selectedChat = useAppSelector(
		(state) => state.chat.selectedChat
	) as Ichats;
	const socket = useAppSelector((state) => state.app.socket);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (selectedChat?.userId === 'ai-bot') {
			setMessage([]);
		}
	}, [selectedChat]);

	useEffect(() => {
		if (selectedChat?.conversationId) {
			socket?.emit('join-room', selectedChat?.conversationId);
			if (
				!selectedChat?.userSentMessage &&
				selectedChat?.messageStatus === 'sent'
			)
				dispatch(
					updateMessageStatus({
						messageStatus: 'seen',
						conversationId: selectedChat?.conversationId,
					})
				);
		}
	}, [selectedChat]);

	useEffect(() => {
		socket?.on('get-message-room', (data: Imessage) => {
			const selected = store.getState().chat.selectedChat as Ichats;
			if (data?.conversationId === selected?.conversationId) {
				updateMesage(data);
			}
		});
	}, [socket]);

	const updateMesage = useCallback((value: Imessage) => {
		setMessage((prev) => [...prev, value]);
	}, []);

	const replaceMessage = useCallback((id: string, value: Imessage) => {
		setMessage((prev) =>
			prev.map((item) => {
				if (item.messageId === id) {
					return value;
				}
				return item;
			})
		);
	}, []);

	if (!selectedChat) {
		return (
			<Container>
				<EmptyResult
					imageUrl='https://img.freepik.com/premium-vector/young-boy-girl-messaging-holding-cell-smart-phones-colorful-chat-bubbles-background_48369-13496.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais'
					size='40rem'
					title=''>
					<Slogan>{'Your World, Your Words, Our Platform'}</Slogan>
				</EmptyResult>
			</Container>
		);
	}
	return (
		<Container>
			<ChatDeatilsHeader />
			<Conversation messages={messages} handleMessage={setMessage} />
			<ChatInput updateMessage={updateMesage} replaceMessage={replaceMessage} />
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	flex: 5,
	backgroundColor: theme.colors.white,
	display: 'flex',
	flexDirection: 'column',
}));

const Slogan = styled.p(({ theme }) => ({
	color: theme.colors.dark,
	fontSize: '2rem',
	textAlign: 'center',
	fontWeight: '600',
	fontStyle: 'italic',
	marginTop: '2rem',
}));
