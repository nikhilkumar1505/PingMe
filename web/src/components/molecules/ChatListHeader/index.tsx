import React from 'react';
import styled, { useTheme } from 'styled-components';
import { Avatar } from '../../atoms/Avatar';
import { Header } from '../..';
import { IconType } from 'react-icons';

interface ChatListHeaderProp {
	Icon: IconType;
	imageUrl?: string;
	handleIconClick: () => void;
	title?: string;
	subTitle?: string;
}

export const ChatListHeader: React.FC<ChatListHeaderProp> = ({
	Icon,
	imageUrl,
	handleIconClick,
	title,
	subTitle,
}) => {
	const theme = useTheme();

	return (
		<Header>
			<AvatarTextContainer>
				<Avatar imageUrl={imageUrl} size='5rem' color='transparent' />
				<TextContainer>
					<FullNameText>{title}</FullNameText>
					<UsernameText>{subTitle}</UsernameText>
				</TextContainer>
			</AvatarTextContainer>
			<HeaderIcon onClick={handleIconClick}>
				<Icon size={20} color={theme.colors.white} />
			</HeaderIcon>
		</Header>
	);
};

const AvatarTextContainer = styled.div(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	width: '90%',
}));

const FullNameText = styled.p(({ theme }) => ({
	fontSize: '1.3rem',
	maxWidth: '15rem',
	fontWeight: '600',
	color: theme.colors.white,
	textTransform: 'uppercase',
	fontFamily: 'sans-serif',
	letterSpacing: '1.5px',
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
}));

const UsernameText = styled.p(({ theme }) => ({
	fontSize: '1rem',
	maxWidth: '15rem',
	color: theme.colors.white,
	fontStyle: 'italic',
	opacity: 0.8,
	textOverflow: 'ellipsis',
	whiteSpace: 'nowrap',
	overflow: 'hidden',
}));

const TextContainer = styled.div(() => ({
	marginTop: '0.2rem',
	marginLeft: '0.5rem',
}));

const HeaderIcon = styled.div(({ theme }) => ({
	borderRadius: '50%',
	borderWidth: '1px',
	padding: '0.5rem',
	cursor: 'pointer',
	['&:hover']: {
		backgroundColor: theme.colors.background2,
	},
}));
