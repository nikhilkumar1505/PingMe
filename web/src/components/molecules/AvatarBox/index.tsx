import React from 'react';
import styled from 'styled-components';
import { Avatar } from '../../atoms/Avatar';

interface AvatarBoxProp {
	imageUrl: string;
	selected: boolean;
	title?: string;
	handleClick: () => void;
}

export const AvatarBox: React.FC<AvatarBoxProp> = ({
	imageUrl,
	selected,
	title,
	handleClick,
}) => {
	return (
		<Box selected={selected} onClick={() => handleClick()}>
			<Avatar imageUrl={imageUrl} size='7rem' />
			<Title>{title}</Title>
		</Box>
	);
};

interface BoxProp {
	selected: boolean;
}

const Box = styled.div<BoxProp>(({ theme, selected }) => ({
	padding: '1rem',
	width: '12rem',
	height: '14rem',
	background: selected
		? `radial-gradient(${theme.colors.background1}, ${theme.colors.violet})`
		: undefined,
	borderRadius: '0.5rem',
	borderWidth: '3px',
	borderColor: theme.colors.violet,
	borderStyle: 'solid',
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
	justifyContent: 'space-between',
	margin: '0 0.5rem',
	cursor: 'pointer',
	boxShadow: selected ? '0 1px 1px 0 #00003d, 0 1px 1px 0 #000030' : '',
	[`@media(${theme.devices.laptop})`]: {
		width: '14rem',
		height: '14rem',
	},
}));

const Title = styled.p(({ theme }) => ({
	color: theme.colors.dark,
	fontWeight: '500',
	textTransform: 'capitalize',
	letterSpacing: '1px',
}));
