import React from 'react';
import styled from 'styled-components';
import './style.css';

interface ITextInput {
	value: string;
	type?: string;
	name: string;
	placeholder?: string;
	error?: string;
	onChange: (e: any) => void;
	StartIconComponent?: () => JSX.Element;
	EndIconComponent?: () => JSX.Element;
}

export const TextInput: React.FC<ITextInput> = ({
	value,
	type = 'text',
	name,
	onChange,
	placeholder,
	StartIconComponent,
	EndIconComponent,
	error,
}) => {
	return (
		<Container>
			<InputContainer>
				{StartIconComponent && <StartIconComponent />}
				<Input
					value={value}
					className='text-input'
					type={type}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
				/>
				{EndIconComponent && <EndIconComponent />}
			</InputContainer>
			{error && <ErrorText>{`*${error}`}</ErrorText>}
		</Container>
	);
};

const Container = styled.div({
	marginBottom: '2rem',
	alignItems: 'flex-start',
	display: 'flex',
	flexDirection: 'column',
});

const InputContainer = styled.div(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	alignItems: 'center',
	justifyContent: 'space-between',
	height: '4rem',
	borderRadius: '2rem',
	width: '30rem',
	backgroundColor: theme.colors.background2,
}));

const ErrorText = styled.p(({ theme }) => ({
	fontSize: '1rem',
	marginTop: '0.2rem',
	marginLeft: '1rem',
	color: theme.colors.error,
}));

const Input = styled.input(({ theme }) => ({
	width: '100%',
	height: '100%',
	borderRadius: '2rem',
	backgroundColor: 'transparent',
	border: 0,
	outline: 0,
	fontSize: '1.6rem',
	paddingLeft: '1rem',
	color: theme.colors.white,
	fontWeight: 700,
}));
