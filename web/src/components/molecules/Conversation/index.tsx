import React, { useState, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import {
	EmptyResult,
	ChatShimmer,
	MessageStatus,
	ActivityLoader,
	Day,
} from '../..';
import { getRandomQuote } from '../../../utils/user';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getMessage } from '../../../store/controllers';
import { Ichats, Imessage } from '../../../types';
import { getFormatedTime } from '../../../utils/time';
import ScrollableFeed from 'react-scrollable-feed';
import store from '../../../store/store';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateIsTyping } from '../../../store/slices';

interface ConversationProp {
	handleMessage: (val: Imessage[]) => void;
	messages: Imessage[];
}

export const Conversation: React.FC<ConversationProp> = ({
	handleMessage,
	messages,
}) => {
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState(false);
	const socket = useAppSelector((state) => state.app.socket);
	const isTyping = useAppSelector((state) => state.chat.isTyping);
	const selectedChat = useAppSelector(
		(state) => state.chat.selectedChat
	) as Ichats;

	useEffect(() => {
		if (selectedChat && selectedChat?.userId !== 'ai-bot') {
			setLoading(true);
			getMessage(selectedChat?.conversationId ?? '', `${selectedChat?.userId}`)
				.then((res) => handleMessage(res))
				.finally(() => setLoading(false));
		}
	}, [selectedChat]);

	useEffect(() => {
		if (socket) {
			socket?.on('started-typing', (room: string) => {
				const selected = store.getState().chat?.selectedChat as Ichats;
				selected?.conversationId === room && dispatch(updateIsTyping(true));
			});
			socket?.on('stopped-typing', () => {
				dispatch(updateIsTyping(false));
			});
		}
	}, [socket, selectedChat]);

	const emptyResultpayload = useMemo(() => {
		if (selectedChat.userId !== 'ai-bot') {
			return {
				title: getRandomQuote(),
				imageUrl:
					'https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1465.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais',
			};
		}
		return {
			imageUrl:
				'https://img.freepik.com/premium-vector/customers-asking-questions-online-shop-chatbot-3d-isometric_1284-63042.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais',
			title: 'Your Virtual Chat Partner: Talk, Learn, Thrive',
		};
	}, [selectedChat]);

	if (loading) {
		return (
			<Container>
				{[...Array(5)].map((_, index) => (
					<ChatShimmer key={index} />
				))}
			</Container>
		);
	}

	if (!loading && messages.length === 0) {
		return (
			<Container>
				<EmptyResult
					imageUrl={emptyResultpayload.imageUrl}
					size='40rem'
					title=''>
					<Slogan>{emptyResultpayload.title}</Slogan>
				</EmptyResult>
			</Container>
		);
	}

	return (
		<Container>
			<ScrollableFeed>
				{messages.map((message, index) => {
					return (
						<>
							<Day
								index={index}
								date={message?.time}
								prevDate={messages[index - 1]?.time}
							/>
							<MessageWrapper
								key={message?.messageId}
								isRight={message?.isUserSentMessage}>
								<MessageContainer isRight={message?.isUserSentMessage}>
									<MessageText isRight={message?.isUserSentMessage}>
										{message?.message}
									</MessageText>
									<Time isRight={message?.isUserSentMessage}>
										{getFormatedTime(message?.time)}
										{message?.isUserSentMessage && (
											<MessageStatus
												status={message?.messageStatus}
												style={{ marginLeft: '0.3rem' }}
											/>
										)}
									</Time>
								</MessageContainer>
							</MessageWrapper>
						</>
					);
				})}
				{isTyping && (
					<TypingContainer>
						<ActivityLoader />
					</TypingContainer>
				)}
			</ScrollableFeed>
		</Container>
	);
};

const Container = styled.div(() => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'scroll',
	padding: '2rem 2.5rem 0',
}));

const Slogan = styled.p(({ theme }) => ({
	color: theme.colors.dark,
	fontSize: '2rem',
	textAlign: 'center',
	fontWeight: '600',
	fontStyle: 'italic',
	maxWidth: '60rem',
}));

interface IisRight {
	isRight?: boolean;
}

const MessageWrapper = styled.div<IisRight>(({ isRight }) => ({
	display: 'flex',
	width: '100%',
	margin: '0.25rem 0',
	justifyContent: isRight ? 'flex-end' : 'flex-start',
}));

const MessageContainer = styled.div<IisRight>(({ theme, isRight }) => ({
	maxWidth: '45%',
	padding: '0.5rem 0.7rem',
	borderRadius: '0.8rem',
	backgroundColor: isRight ? theme.colors.violet : theme.colors.background5,
}));

const MessageText = styled.p<IisRight>(({ isRight, theme }) => ({
	fontSize: '1.3rem',
	lineHeight: '1.8rem',
	fontWeight: 500,
	fontFamily: 'sans-serif',
	display: 'flex',
	color: isRight ? theme.colors.white : theme.colors.dark,
}));

const Time = styled.p<IisRight>(({ isRight, theme }) => ({
	fontSize: '0.8rem',
	minWidth: 'max-content',
	display: 'flex',
	justifyContent: 'flex-end',
	color: isRight ? theme.colors.white : theme.colors.dark,
	alignItems: 'center',
}));

const TypingContainer = styled.div(({ theme }) => ({
	borderRadius: '2rem',
	backgroundColor: theme.colors.background5,
	padding: '1rem 2rem',
	width: 'max-content',
	marginTop: '0.25rem',
}));
