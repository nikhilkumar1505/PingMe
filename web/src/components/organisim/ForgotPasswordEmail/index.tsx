import { Form, useFormik } from 'formik';
import React from 'react';
import styled from 'styled-components';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';
import { EmailSchema } from '../../../utils/validation';
import { Link } from 'react-router-dom';

interface ForgotPasswordEmailProp {
	formikValue: any;
	isLoading?: boolean;
}

export const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProp> = ({
	formikValue,
	isLoading,
}) => {
	return (
		<>
			<ForgotPasswordWrapper>
				<ForgotPasswordTitle>{'Trouble with logging in?'}</ForgotPasswordTitle>
				<ForgotPasswordDesc>
					Enter your email address and we'll send you a link to get back into
					your account.
				</ForgotPasswordDesc>
			</ForgotPasswordWrapper>
			<form onSubmit={formikValue.handleSubmit}>
				<TextInput
					value={formikValue.values.email}
					type='text'
					name='email'
					placeholder='Email Id'
					onChange={formikValue.handleChange}
					error={formikValue.errors.email}
				/>
				<LoginTextContainer>
					<LoginText to='/'>Back to Login</LoginText>
				</LoginTextContainer>
				<Button
					text='get otp'
					onClick={formikValue.handleSubmit}
					type='submit'
					isLoading={isLoading}
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

const LoginText = styled(Link)(({ theme }) => ({
	color: theme.colors.violet,
	fontSize: '1.3rem',
	marginTop: '4.5rem',
	textDecorationStyle: 'solid',
}));

const LoginTextContainer = styled.div(() => ({
	margin: '1.2rem 0',
}));
