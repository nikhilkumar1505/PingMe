import React from 'react';
import styled from 'styled-components';

interface EmptyResultsProp {
	size?: string;
	title: string;
	imageUrl: string;
	children?: JSX.Element[] | JSX.Element;
}

export const EmptyResult: React.FC<EmptyResultsProp> = ({
	size,
	imageUrl,
	title,
	children,
}) => {
	return (
		<Container>
			<CenterImage src={imageUrl} size={size} />
			{title && <CenterTitle>{title}</CenterTitle>}
			{children}
		</Container>
	);
};

const Container = styled.div(() => ({
	width: '100%',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
}));

const CenterImage = styled.img<{ size?: string }>(({ size }) => ({
	width: size ?? '25rem',
	height: size ?? '25rem',
	mixBlendMode: 'multiply',
}));

const CenterTitle = styled.p(({ theme }) => ({
	maxWidth: '80%',
	fontSize: '2rem',
	fontWeight: 'bold',
	textAlign: 'center',
	color: theme.colors.violet,
	marginTop: '1rem',
}));
