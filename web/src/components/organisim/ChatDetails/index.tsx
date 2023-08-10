import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { EmptyResult } from '../../atoms/EmptyResult';
import { ChatDeatilsHeader, ChatInput, Conversation } from '../..';

export const ChatDetails = () => {
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);

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
			<Conversation />
			<ChatInput />
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
