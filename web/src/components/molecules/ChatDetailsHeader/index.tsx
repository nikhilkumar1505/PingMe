import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Header } from '../..';
import styled from 'styled-components';

export const ChatDeatilsHeader = () => {
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);
	return (
		<Container>
			<Header
				imageUrl={selectedChat?.imageUrl}
				title={selectedChat?.fullName}
				subTitle={'online'}
			/>
		</Container>
	);
};

const Container = styled.div(() => ({
	flex: 2,
}));
