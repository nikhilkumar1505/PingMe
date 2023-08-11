import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../atoms/Avatar';
import { useAppSelector } from '../../../hooks/useAppSelector';

interface ChatBoxProp {
	imageUrl: string;
	lastIndex: boolean;
	title: string;
	description: string;
	timer?: string;
	handleClick?: (value?: any) => void;
	id?: string;
}

export const ChatBox: React.FC<ChatBoxProp> = ({
	imageUrl,
	lastIndex,
	title,
	description,
	timer,
	handleClick,
	id,
}) => {
	const selectedChat = useAppSelector((state) => state.chat.selectedChat);
	return (
		<ChatListBox
			lastIndex={lastIndex}
			onClick={handleClick}
			selectedCard={!!(selectedChat?.userId && selectedChat?.userId === id)}>
			<Avatar imageUrl={imageUrl} size='5rem' color='transparent' />
			<NameTextWrapper>
				<NameTimeWrapper>
					<UserFullName>{title}</UserFullName>
					{timer && <Timer>{timer}</Timer>}
				</NameTimeWrapper>
				<TextIconWrapper>
					<LastText>{description}</LastText>
				</TextIconWrapper>
			</NameTextWrapper>
		</ChatListBox>
	);
};

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
}));

const LastText = styled.p(() => ({
	fontSize: '1.1rem',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	fontStyle: 'italic',
}));

const Timer = styled.p(() => ({
	fontSize: '0.9rem',
	marginLeft: '1rem',
	whiteSpace: 'nowrap',
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