import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../Avatar';

interface HeaderProps {
	children?: JSX.Element[] | JSX.Element;
	imageUrl?: string;
	title?: string;
	subTitle?: string;
	onClick?: () => void;
	isClickable?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
	children,
	imageUrl,
	title,
	subTitle,
	onClick,
	isClickable,
}) => {
	return (
		<Container>
			<AvatarTextContainer>
				<Avatar
					imageUrl={imageUrl}
					size='5rem'
					color='transparent'
					handleAvatarClick={onClick}
					clickable={isClickable}
				/>
				<TextContainer>
					<FullNameText>{title}</FullNameText>
					<UsernameText>{subTitle}</UsernameText>
				</TextContainer>
			</AvatarTextContainer>
			{children}
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	backgroundColor: theme.colors.background2,
	height: '6.5rem',
	flex: 1,
	width: '100%',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	padding: '0.5rem 1.25rem',
	position: 'sticky',
}));

const AvatarTextContainer = styled.div(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	width: '85%',
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
