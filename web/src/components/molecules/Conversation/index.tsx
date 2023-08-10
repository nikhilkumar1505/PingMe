import React from 'react';
import { styled } from 'styled-components';
import { EmptyResult, ChatShimmer } from '../..';
import { getRandomQuote } from '../../../utils/user';

export const Conversation = () => {
	if (true) {
		return (
			<Container>
				<EmptyResult
					imageUrl='https://img.freepik.com/free-vector/messenger-concept-illustration_114360-1465.jpg?size=626&ext=jpg&ga=GA1.2.304103842.1690276064&semt=ais'
					size='40rem'
					title=''>
					<Slogan>{getRandomQuote()}</Slogan>
				</EmptyResult>
			</Container>
		);
	}
	if (true) {
		return (
			<Container>
				{[...Array(4)].map((_, index) => (
					<ChatShimmer key={index} />
				))}
			</Container>
		);
	}
	return <Container></Container>;
};

const Container = styled.div(() => ({
	display: 'flex',
	flex: 14,
	flexDirection: 'column',
	overflow: 'scroll',
}));
const Slogan = styled.p(({ theme }) => ({
	color: theme.colors.dark,
	fontSize: '2rem',
	textAlign: 'center',
	fontWeight: '600',
	fontStyle: 'italic',
	maxWidth: '60rem',
}));
