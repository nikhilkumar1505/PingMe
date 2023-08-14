import React, { useCallback, useEffect, useState } from 'react';
import { ChatBox } from '../ChatBox';
import styled, { css, keyframes } from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getAllChat } from '../../../store/controllers';
import { getRelativeTimeDescription } from '../../../utils/time';
import {
	updateChatValue,
	updateChats,
	updateSelectedChats,
} from '../../../store/slices';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { Ichats, Imessage } from '../../../types';
import store from '../../../store/store';

export const ConversationList = () => {
	const chats = useAppSelector((state) => state.chat.chats);
	const socket = useAppSelector((state) => state.app.socket);
	const dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			const res = await getAllChat();
			dispatch(updateChats(res));
		})();
	}, []);

	useEffect(() => {
		const selected = store.getState().chat.selectedChat as Ichats;
		socket?.on('get-message', (data: Imessage) => {
			dispatch(
				updateChatValue({
					...data,
					userSentMessage: false,
					messageStatus:
						data?.conversationId === selected?.conversationId ? 'seen' : 'sent',
				})
			);
		});
	}, [socket]);

	const handleCardClick = useCallback((item: any) => {
		dispatch(updateSelectedChats(item));
	}, []);

	return (
		<ListContainer>
			{chats.length > 0 &&
				chats.map((item) => {
					return (
						<ChatBox
							imageUrl={item?.imageUrl}
							lastIndex={true}
							key={item?.conversationId}
							title={item?.fullName}
							description={item?.message}
							id={item?.userId}
							timer={getRelativeTimeDescription(item?.time, true)}
							messageStatus={
								item?.userSentMessage ? item?.messageStatus : undefined
							}
							isUnread={
								!item?.userSentMessage && item?.messageStatus === 'sent'
							}
							handleClick={() => handleCardClick(item)}
						/>
					);
				})}
		</ListContainer>
	);
};

const fadeToBlack = keyframes` 
  from {
    opacity:0;
    transform: translate(0,20px);
  },
  to {
    opacity:1;
  }
`;

const ListContainer = styled.div(
	({ theme }) => ({
		padding: '0.5rem 1.5rem 1rem',
	}),
	css`
		animation: ${fadeToBlack} 0.3s linear;
	`
);
