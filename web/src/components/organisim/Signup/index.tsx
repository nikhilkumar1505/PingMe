import React from 'react';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

interface signupProp {
	formikValue: any;
	isLoading?: boolean;
}
const Signup: React.FC<signupProp> = ({ formikValue, isLoading }) => {
	return (
		<form onSubmit={formikValue.handleSubmit}>
			<TextInput
				value={formikValue.values.email}
				type='text'
				name='email'
				placeholder='Email Id'
				onChange={formikValue.handleChange}
				error={formikValue.errors.email}
			/>
			<Button
				text='Signup'
				onClick={formikValue.handleSubmit}
				type='submit'
				isLoading={isLoading}
			/>
			<LoginText>
				Already have an account, <LinkText to='/login'>Login</LinkText>
			</LoginText>
		</form>
	);
};

export { Signup };

const LoginText = styled.p(({ theme }) => ({
	fontSize: '1.6rem',
	color: theme.colors.violet,
	fontWeight: '500',
	marginTop: '3rem',
}));

const LinkText = styled(Link)(({ theme }) => ({
	color: theme.colors.secondary,
	fontWeight: '800',
	fontSize: '1.6rem',
	fontFamily: 'sans-serif',
	marginLeft: '0.6rem',
	textDecoration: 'none',
}));
