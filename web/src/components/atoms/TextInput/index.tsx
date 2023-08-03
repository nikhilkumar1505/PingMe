import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import './style.css';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

interface ITextInput {
	value: string;
	type?: string;
	name: string;
	placeholder?: string;
	error?: string;
	onChange: (e: any) => void;
	passwordType?: boolean;
}

export const TextInput: React.FC<ITextInput> = ({
	value,
	type = 'text',
	name,
	onChange,
	placeholder,
	error,
	passwordType,
}) => {
	const [showPassword, setShowPassword] = useState(true);
	const Icon = showPassword ? AiFillEyeInvisible : AiFillEye;

	const handleClick = useCallback(() => {
		setShowPassword((prev) => !prev);
	}, []);
	return (
		<Container>
			<InputContainer>
				<Input
					value={value}
					className='text-input'
					type={passwordType && showPassword ? 'password' : type}
					name={name}
					onChange={onChange}
					placeholder={placeholder}
				/>
				{passwordType && (
					<Icon
						className='password-icon'
						size={'2.1rem'}
						onClick={handleClick}
					/>
				)}
			</InputContainer>
			<ErrorText>{error ? `*${error}` : ''}</ErrorText>
		</Container>
	);
};

const Container = styled.div({
	marginBottom: '1rem',
	alignItems: 'flex-start',
	display: 'flex',
	flexDirection: 'column',
});

const InputContainer = styled.div(({ theme }) => ({
	display: 'flex',
	position: 'relative',
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
	height: '1rem',
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
	fontWeight: 500,
	letterSpacing: '1.1px',
}));
