import React from 'react';
import { ChatDetails, ChatList } from '../../components';
import { styled } from 'styled-components';

const Chat = () => {
	return (
		<MainContainer>
			<Container>
				<ChatList />
				<ChatDetails />
			</Container>
		</MainContainer>
	);
};

export default Chat;

const MainContainer = styled.div(({ theme }) => ({
	backgroundColor: theme.colors.background4,
	padding: '1rem',
	height: '100vh',
}));

const Container = styled.div(({ theme }) => ({
	display: 'flex',
	flex: 1,
	borderRadius: '0.8rem',
	overflow: 'hidden',
	borderWidth: '1px',
	height: '100%',
}));
