import React, { useState, useEffect } from 'react';
import { styled, useTheme } from 'styled-components';
import { EmptyResult, ChatShimmer } from '../..';
import { getRandomQuote } from '../../../utils/user';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { getMessage } from '../../../store/controllers';
import { Ichats, Imessage } from '../../../types';
import { getFormatedTime } from '../../../utils/time';
import { PiCheckBold, PiChecksBold } from 'react-icons/pi';
import ScrollableFeed from 'react-scrollable-feed';

interface ConversationProp {
	handleMessage: (val: Imessage[]) => void;
	messages: Imessage[];
}

export const Conversation: React.FC<ConversationProp> = ({
	handleMessage,
	messages,
}) => {
	const [loading, setLoading] = useState(false);
	const theme = useTheme();
	const selectedChat = useAppSelector(
		(state) => state.chat.selectedChat
	) as Ichats;

	useEffect(() => {
		if (selectedChat) {
			setLoading(true);
			getMessage(selectedChat?.conversationId ?? '', `${selectedChat?.userId}`)
				.then((res) => res.length > 0 && handleMessage(res))
				.finally(() => setLoading(false));
		}
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
					imageUrl='https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1465.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais'
					size='40rem'
					title=''>
					<Slogan>{getRandomQuote()}</Slogan>
				</EmptyResult>
			</Container>
		);
	}

	return (
		<Container>
			<ScrollableFeed>
				{messages.map((message) => {
					return (
						<MessageWrapper
							key={message.messageId}
							isRight={message.isUserSentMessage}>
							<MessageContainer isRight={message.isUserSentMessage}>
								<MessageText isRight={message.isUserSentMessage}>
									{message.message}
								</MessageText>
								<Time isRight={message.isUserSentMessage}>
									{getFormatedTime(message.time)}
									{message.isUserSentMessage &&
										message.messageStatus === 'sent' && (
											<PiCheckBold
												size={'1.3rem'}
												color={theme.colors.dark}
												style={{ marginLeft: '0.3rem' }}
											/>
										)}
									{message.isUserSentMessage &&
										message.messageStatus === 'seen' && (
											<PiChecksBold
												size={'1.3rem'}
												color={theme.colors.primary}
												style={{ marginLeft: '0.3rem' }}
											/>
										)}
								</Time>
							</MessageContainer>
						</MessageWrapper>
					);
				})}
			</ScrollableFeed>
		</Container>
	);
};

const Container = styled.div(() => ({
	display: 'flex',
	flex: 1,
	flexDirection: 'column',
	overflow: 'scroll',
	padding: '2rem 2.5rem',
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
