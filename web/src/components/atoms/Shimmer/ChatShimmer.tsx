import React from 'react';
import styled, { keyframes } from 'styled-components';

const randomHeight = Math.floor(Math.random() * (6 - 3) + 3);

const shimmerAnimation = keyframes`
  0% {
    background-position: -500px 0;
    opacity:0.8
  }
  100% {
    background-position: 500px 0;
    opacity:1
  }
`;

const ShimmerContainer = styled.div`
	width: 100%;
`;

const Shimmer = styled.div<{ right?: boolean }>`
	background: linear-gradient(
		to right,
		#25252533 0%,
		#e0e0e0 50%,
		#25252533 100%
	);
	animation: ${shimmerAnimation} 1.5s ease-in infinite;
	margin: 0.8rem 1rem;
	height: ${randomHeight}rem;
	border-radius: 0.8rem;
	width: 55%;
	float: ${(prop) => (prop.right ? 'right' : 'left')};
`;

export const ChatShimmer = () => {
	return (
		<ShimmerContainer>
			<Shimmer />
			<Shimmer right />
			<Shimmer right={Math.random() > 0.6 ? true : false} />
		</ShimmerContainer>
	);
};
