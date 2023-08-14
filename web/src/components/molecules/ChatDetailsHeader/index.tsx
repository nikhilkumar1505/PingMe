import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Header } from '../..';
import styled from 'styled-components';

export const ChatDeatilsHeader = () => {
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);
	const onlineUsers = useAppSelector((state) => state.app.onlineUsers);

	const subtitle: string =
		selectedChat?.userId === 'ai-bot'
			? selectedChat.username
			: selectedChat && onlineUsers[selectedChat?.userId]
			? 'online'
			: 'offline';

	return (
		<Container>
			<Header
				imageUrl={selectedChat?.imageUrl}
				title={selectedChat?.fullName}
				subTitle={subtitle}
			/>
		</Container>
	);
};

const Container = styled.div(() => ({
	height: 'max-content',
}));
