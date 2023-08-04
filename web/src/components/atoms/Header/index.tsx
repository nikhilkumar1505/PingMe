import React from 'react';
import styled from 'styled-components';

interface HeaderProps {
	children: JSX.Element[] | JSX.Element;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
	return <Container>{children}</Container>;
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
