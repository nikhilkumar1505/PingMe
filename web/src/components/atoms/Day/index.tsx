import React from 'react';
import styled from 'styled-components';
import { getRelativeTimeDescription } from '../../../utils/time';

interface DayProp {
	date: string;
	prevDate: string;
	index: number;
}

export const Day: React.FC<DayProp> = ({ date, index, prevDate }) => {
	const diff = new Date(date).getDate() - new Date(prevDate).getDate();
	const formattedDate = getRelativeTimeDescription(date);

	return index === 0 || diff > 0 ? (
		<Container>
			<DateContainer>
				<DateText>{formattedDate}</DateText>
			</DateContainer>
		</Container>
	) : (
		<></>
	);
};

const Container = styled.div({
	display: 'flex',
	justifyContent: 'center',
	width: '100%',
});

const DateContainer = styled.div(({ theme }) => ({
	backgroundColor: theme.colors.background2,
	textAlign: 'center',
	alignSelf: 'center',
	padding: '0.4rem 0.8rem',
	margin: '0.5rem',
	width: 'max-content',
	borderRadius: '5px',
}));

const DateText = styled.p(({ theme }) => ({
	color: theme.colors.dark,
	fontSize: '1rem',
}));
