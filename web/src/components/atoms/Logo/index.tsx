import React from 'react';
import styled from 'styled-components';
import AppLogo from '../../../assets/Images/logo.png';

export const Logo = () => {
	return (
		<LogoContainer>
			<LogoImage src={AppLogo} alt='' />
			<LogoTitle>PingMe</LogoTitle>
		</LogoContainer>
	);
};

const LogoContainer = styled.div({
	display: 'flex',
	alignItems: 'center',
});

const LogoImage = styled.img({
	width: '4.7rem',
	height: '4.5rem',
});

const LogoTitle = styled.h1(({ theme }) => ({
	color: theme.colors.secondary,
	marginLeft: '2rem',
	fontWeight: 900,
	textShadow: `1px 1px ${theme.colors.violet}`,
}));
