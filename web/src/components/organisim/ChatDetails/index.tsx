import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { EmptyResult } from '../../atoms/EmptyResult';
import { ChatDeatilsHeader, ChatInput, Conversation } from '../..';
import { Imessage } from '../../../types';

export const ChatDetails = () => {
	const [messages, setMessage] = useState<Imessage[] | []>([]);
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);

	const updateMesage = useCallback(
		(value: Imessage) => {
			setMessage((prev) => [...prev, value]);
		},
		[messages]
	);

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
			<ChatInput updateMessage={updateMesage} />
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
