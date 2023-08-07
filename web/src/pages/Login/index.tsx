import { Form, useFormik } from 'formik';
import React, { useState } from 'react';
import { Logo, GlassMorphis, TextInput, Button } from '../../components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from '../../assets/Images/bg1.png';
import { LoginSchema } from '../../utils/validation';
import { login } from '../../store/controllers';

const Login = () => {
	const [loading, setLoading] = useState(false);
	const loginFormik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		validationSchema: LoginSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: (value) => {
			setLoading(true);
			login(value).finally(() => setLoading(false));
		},
	});

	return (
		<Container>
			<Logo />
			<GlassMorphis title={'Login'}>
				<form onSubmit={loginFormik.handleSubmit}>
					<TextInput
						value={loginFormik.values.username}
						type='text'
						name='username'
						placeholder='username'
						onChange={loginFormik.handleChange}
						error={loginFormik.errors.username}
					/>
					<TextInput
						value={loginFormik.values.password}
						type='text'
						name='password'
						placeholder='password'
						onChange={loginFormik.handleChange}
						error={loginFormik.errors.password}
						passwordType
					/>
					<Button
						text='Login'
						onClick={loginFormik.handleSubmit}
						className='login-style'
						type='submit'
						isLoading={loading}
					/>
					<ForgotTextContainer>
						<ForgotText to='/forgot-password'>Forgot Password?</ForgotText>
					</ForgotTextContainer>
					<LoginText>
						Don't have an account, <LinkText to='/register'>Sign Up</LinkText>
					</LoginText>
				</form>
			</GlassMorphis>
		</Container>
	);
};

export default Login;

const Container = styled.div({
	backgroundImage: `url(${backgroundImage})`,
	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	width: '100vw',
	height: '100vh',
	backgroundSize: 'cover',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
});

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

const ForgotTextContainer = styled.div(() => ({
	marginTop: '1.2rem',
}));
const ForgotText = styled(Link)(({ theme }) => ({
	color: theme.colors.violet,
	fontSize: '1.3rem',
	marginTop: '3rem',
	textDecorationStyle: 'solid',
}));
