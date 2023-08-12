import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Avatar } from '../../atoms/Avatar';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { PiCheckBold, PiChecksBold } from 'react-icons/pi';

interface ChatBoxProp {
	imageUrl: string;
	lastIndex: boolean;
	title: string;
	description: string;
	timer?: string;
	handleClick?: (value?: any) => void;
	id?: string;
	messageStatus?: 'seen' | 'sent' | string;
	isUnread?: boolean;
}

export const ChatBox: React.FC<ChatBoxProp> = ({
	imageUrl,
	lastIndex,
	title,
	description,
	timer,
	handleClick,
	id,
	messageStatus,
	isUnread = false,
}) => {
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);
	const theme = useTheme();
	return (
		<ChatListBox
			lastIndex={lastIndex}
			onClick={handleClick}
			selectedCard={!!(selectedChat?.userId && selectedChat?.userId === id)}>
			<Avatar imageUrl={imageUrl} size='5rem' color='transparent' />
			<NameTextWrapper>
				<NameTimeWrapper>
					<UserFullName>{title}</UserFullName>
					{timer && <Timer unread={isUnread}>{timer}</Timer>}
				</NameTimeWrapper>
				<TextIconWrapper>
					{messageStatus === 'sent' && (
						<PiCheckBold
							size={'1.3rem'}
							color={theme.colors.dark}
							style={{ marginRight: '0.3rem' }}
						/>
					)}
					{messageStatus === 'seen' && (
						<PiChecksBold
							size={'1.3rem'}
							color={theme.colors.primary}
							style={{ marginRight: '0.3rem' }}
						/>
					)}
					<LastText unread={isUnread}>{description}</LastText>
				</TextIconWrapper>
			</NameTextWrapper>
		</ChatListBox>
	);
};

interface Iunread {
	unread?: boolean;
}

const NameTextWrapper = styled.div(() => ({
	marginLeft: '1rem',
	maxWidth: '100%',
}));

const NameTimeWrapper = styled.div(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '25rem',
}));

const UserFullName = styled.p(({ theme }) => ({
	fontSize: '1.6rem',
	maxWidth: '17rem',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	fontWeight: '600',
	color: theme.colors.violet,
}));

const TextIconWrapper = styled.div(() => ({
	maxWidth: '25rem',
	display: 'flex',
	alignItems: 'center',
}));

const LastText = styled.p<Iunread>(({ unread }) => ({
	fontSize: '1.1rem',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	fontStyle: 'italic',
	fontWeight: unread ? '700' : '500',
}));

const Timer = styled.p<Iunread>(({ unread }) => ({
	fontSize: '0.9rem',
	marginLeft: '1rem',
	whiteSpace: 'nowrap',
	fontWeight: unread ? '700' : '500',
}));

interface ChatListProp {
	lastIndex: boolean;
	selectedCard: boolean;
}

const ChatListBox = styled.div<ChatListProp>(
	({ theme, lastIndex, selectedCard }) => ({
		padding: '1rem 0.7rem',
		borderBottom: lastIndex ? `1px solid ${theme.colors.background2}` : '',
		display: 'flex',
		alignItems: 'center',
		maxWidth: '35rem',
		cursor: 'pointer',
		backgroundColor: selectedCard ? theme.colors.background2 : 'transparent',
		['&:hover']: {
			backgroundColor: selectedCard
				? theme.colors.background2
				: theme.colors.background5,
		},
	})
);
