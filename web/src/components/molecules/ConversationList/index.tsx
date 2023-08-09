import React from 'react';
import { ChatBox } from '../ChatBox';
import styled, { css, keyframes } from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';

export const ConversationList = () => {
	const avatars = useAppSelector((state) => state.app.avatars);
	return (
		<ListContainer>
			{[...Array(10)].map((item, index) => {
				return (
					<ChatBox
						imageUrl={avatars[0]?.image_url}
						lastIndex={index !== 9}
						key={index}
						title={'janatataka aka'}
						description={'come on bro this is so wrong'}
					/>
				);
			})}
		</ListContainer>
	);
};

const fadeToBlack = keyframes` 
  from {
    opacity:0;
    transform: translate(0,20px);
  },
  to {
    opacity:1;
  }
`;

const ListContainer = styled.div(
	({ theme }) => ({
		padding: '0.5rem 1.5rem 1rem',
		borderBottom: `2px solid ${theme.colors.background2}`,
	}),
	css`
		animation: ${fadeToBlack} 0.3s linear;
	`
);
