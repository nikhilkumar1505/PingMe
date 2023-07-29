import { useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';

export const ForgotPasswordEmail = () => {
	const emailFormik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: () => console.log('submited'),
	});
	return (
		<>
			<ForgotPasswordWrapper>
				<ForgotPasswordTitle>{'Trouble with logging in?'}</ForgotPasswordTitle>
				<ForgotPasswordDesc>
					{
						"Enter your email address and we'll send you a link to get back into your account."
					}
				</ForgotPasswordDesc>
			</ForgotPasswordWrapper>
			<form onSubmit={emailFormik.submitForm}>
				<TextInput
					value={emailFormik.values.email}
					type='text'
					name='email'
					placeholder='Email Id'
					onChange={emailFormik.handleChange}
				/>
				<Button
					text='get otp'
					onClick={() => console.log('clicekd')}
					type='submit'
				/>
			</form>
		</>
	);
};

const ForgotPasswordWrapper = styled.div(({ theme }) => ({
	marginBottom: '2rem',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'flex-start',
}));

const ForgotPasswordTitle = styled.p(({ theme }) => ({
	fontSize: '1.6rem',
	fontWeight: '700',
	color: theme.colors.violet,
}));

const ForgotPasswordDesc = styled.p(({ theme }) => ({
	width: '30rem',
	textAlign: 'left',
	marginTop: '0.6rem',
	lineHeight: '1.5rem',
	color: theme.colors.background2,
}));
