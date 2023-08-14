import React from 'react';
import styled, { keyframes } from 'styled-components';

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

const ShimmerContainer = styled.div<{ right: boolean }>`
	width: 100%;
	display: flex;
	justify-content: ${(props) => (props.right ? 'flex-start' : 'flex-end')};
`;

const Shimmer = styled.div`
	background: linear-gradient(
		to right,
		#25252533 0%,
		#e0e0e0 50%,
		#25252533 100%
	);
	animation: ${shimmerAnimation} 1.5s ease-in infinite;
	margin: 0.25rem 1rem;
	height: ${Math.random() * (6.5 - 4.3) + 4.2}rem;
	border-radius: 0.8rem;
	width: ${Math.random() * (70 - 35) + 40}%;
	display: flex;
`;

export const ChatShimmer = () => {
	return (
		<>
			<ShimmerContainer right={true}>
				<Shimmer />
			</ShimmerContainer>
			<ShimmerContainer right={false}>
				<Shimmer />
			</ShimmerContainer>
			<ShimmerContainer right={Math.random() > 0.5 ? true : false}>
				<Shimmer />
			</ShimmerContainer>
		</>
	);
};
