import React from 'react';
import styled from 'styled-components';
import './style.css';

interface IGlasssMorphis {
	children: JSX.Element;
	title: string;
	cardClassName?: string;
	titleClassName?: string;
}
export const GlassMorphis: React.FC<IGlasssMorphis> = ({
	children,
	title,
	cardClassName,
	titleClassName,
}) => {
	return (
		<Container className={cardClassName}>
			<Titletext className={titleClassName}>{title}</Titletext>
			{children}
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '2rem 3.5rem',
	backgroundColor: theme.colors.glassMorph,
	minHeight: '20vh',
	minWidth: '25vw',
	marginTop: '4rem',
	borderRadius: '1rem',
	boxShadow: `0 0.8rem 3rem 0 ${theme.colors.background1}`,
	backdropFilter: 'blur(0.6rem)',
	color: theme.colors.white,
	textAlign: 'center',
}));

const Titletext = styled.h2(() => ({
	fontSize: '2rem',
	textTransform: 'uppercase',
	letterSpacing: '0.4rem',
	fontWeight: 'bold',
	marginBottom: '3rem',
	textShadow: '2px 2px #604bff',
}));
