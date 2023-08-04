import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../atoms/Avatar';

interface ChatBoxProp {
	imageUrl: string;
	lastIndex: boolean;
}

export const ChatBox: React.FC<ChatBoxProp> = ({ imageUrl, lastIndex }) => {
	return (
		<ChatListBox lastIndex={lastIndex}>
			<Avatar imageUrl={imageUrl} size='5rem' color='transparent' />
			<NameTextWrapper>
				<NameTimeWrapper>
					<UserFullName>Dhurva Rambahahahaho just to check</UserFullName>
					<Timer>11.30 AM </Timer>
				</NameTimeWrapper>
				<TextIconWrapper>
					<LastText>
						this is text which was sent by dhruva which is long
					</LastText>
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
}

const ChatListBox = styled.div<ChatListProp>(({ theme, lastIndex }) => ({
	padding: '1rem 0.7rem',
	borderBottom: lastIndex ? `1px solid ${theme.colors.background2}` : '',
	display: 'flex',
	alignItems: 'center',
	maxWidth: '35rem',
	cursor: 'pointer',
	['&:hover']: {
		backgroundColor: theme.colors.background5,
	},
}));
