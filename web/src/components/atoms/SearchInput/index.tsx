import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BiSearch } from 'react-icons/bi';

interface ISearchInput {
	value: string;
	onChange: (e: any) => void;
}

export const SearchInput: React.FC<ISearchInput> = ({ value, onChange }) => {
	const theme = useTheme();
	return (
		<InputContainer>
			<BiSearch size={20} color={theme.colors.violet} />
			<Input
				value={value}
				type={'text'}
				onChange={onChange}
				placeholder={'Search Friends'}
			/>
		</InputContainer>
	);
};

const InputContainer = styled.div(({ theme }) => ({
	display: 'flex',
	position: 'relative',
	flexDirection: 'row',
	alignItems: 'center',
	height: '3rem',
	borderRadius: '2rem',
	width: '28rem',
	backgroundColor: theme.colors.white,
	margin: '0rem 2.5rem',
	marginTop: '1rem',
	paddingLeft: '1.5rem',
}));

const Input = styled.input(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '2rem',
	border: 0,
	outline: 0,
	fontSize: '1.2rem',
	paddingLeft: '1rem',
	color: theme.colors.dark,
	letterSpacing: '1.1px',
	['&::placeholder']: {
		letterSpacing: '1px',
		fontSize: '1.2rem',
		fontWeight: '400',
	},
}));
