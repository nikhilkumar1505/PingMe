import React from 'react';
import styled, { keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
    0% {
    background-position: -50rem 0;
  }
  100% {
    background-position: 50rem 0;
  }
`;

const ShimmerWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 15px;
`;

const Avatar = styled.div`
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	background: linear-gradient(to bottom right, #f0f0f0 0%, #e0e0e0 100%);
	animation: ${shimmerAnimation} 2s infinite;
	margin-right: 15px;
`;

const ChatArea = styled.div`
	flex: 1;
	height: 5rem;
	background: linear-gradient(to bottom right, #f0f0f0 0%, #e0e0e0 100%);
	animation: ${shimmerAnimation} 2s infinite;
`;

export const Shimmer = () => {
	return (
		<ShimmerWrapper>
			<Avatar />
			<ChatArea />
		</ShimmerWrapper>
	);
};
