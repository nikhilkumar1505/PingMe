import React from 'react';
import { css, keyframes, styled } from 'styled-components';
import loaderGif from '../../../assets/Images/animationGif.gif';
import backgroundImage from '../../../assets/Images/backgroundImage.png';
import { Logo } from '../../atoms/Logo';
const PageLoader = () => {
	return (
		<Container>
			<ImageGif src={loaderGif} alt='loading...' />
			<LogoContanier>
				<Logo />
			</LogoContanier>
		</Container>
	);
};

export default PageLoader;

const Container = styled.div(({ theme }) => ({
	backgroundImage: `url(${backgroundImage})`,
	backgroundAttachment: 'fixed',
	backgroundPosition: 'unset',
	width: '100vw',
	height: '100vh',
	backgroundSize: 'cover',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
}));

const ImageGif = styled.img(() => ({
	height: '25vh',
	width: '25vh',
	borderRadius: '12vh',
}));

const fadeToBlack = keyframes` 
  from {
    opacity:0;
    transform: translate(0,10px);
  },
  to {
    opacity:1;
  }
`;

const LogoContanier = styled.div(
	{ display: 'flex' },
	css`
		animation: ${fadeToBlack} 2s linear;
	`
);
