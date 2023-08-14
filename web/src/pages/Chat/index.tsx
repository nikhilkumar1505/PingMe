import React, { useEffect } from 'react';
import { ChatDetails, ChatList } from '../../components';
import { styled } from 'styled-components';
import { io } from 'socket.io-client';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { intializeSocket, updateOnlineUser } from '../../store/slices';
import { useAppSelector } from '../../hooks/useAppSelector';
import { BASE_URL } from '../../utils/constants';

const Chat = () => {
	const userId = useAppSelector((state) => state.user.userId);
	const dispatch = useAppDispatch();
	const socketIntilized = useAppSelector((state) => state.app.socket);

	useEffect(() => {
		const socket = io(BASE_URL);
		dispatch(intializeSocket(socket));
		socket.on('getOnlineUser', (users) => {
			dispatch(updateOnlineUser(users));
		});
	}, []);

	useEffect(() => {
		// Tab has focus
		const handleFocus = () => {
			socketIntilized?.emit('user-online', userId);
			socketIntilized?.on('getOnlineUser', (users: any) => {
				dispatch(updateOnlineUser(users));
			});
		};

		// Tab closed
		const handleBlur = () => {
			if (userId) {
				socketIntilized.emit('user-offline', userId);
			}
		};
		window.addEventListener('focus', handleFocus);
		window.addEventListener('blur', handleBlur);

		return () => {
			window.removeEventListener('focus', handleFocus);
			window.removeEventListener('blur', handleBlur);
		};
	}, [userId]);

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
