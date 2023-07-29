import React from 'react';
import { styled } from 'styled-components';
import backgroundImage from '../../assets/Images/bg1.png';
import { Button, GlassMorphis, Logo, TextInput } from '../../components';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

const Register = () => {
	const emailUserNameFormik = useFormik({
		initialValues: {
			username: '',
			email: '',
		},
		onSubmit: () => console.log('submited'),
	});
	return (
		<Container>
			<Logo />
			<GlassMorphis title={'Welcome'}>
				<form onSubmit={emailUserNameFormik.submitForm}>
					<TextInput
						value={emailUserNameFormik.values.email}
						type='text'
						name='email'
						placeholder='Email Id'
						onChange={emailUserNameFormik.handleChange}
					/>
					<TextInput
						value={emailUserNameFormik.values.username}
						type='text'
						name='username'
						placeholder='username'
						onChange={emailUserNameFormik.handleChange}
					/>
					<Button
						text='register'
						onClick={() => console.log('clicekd')}
						type='submit'
					/>
					<LoginText>
						Already have an account, <LinkText to='/login'>Login</LinkText>
					</LoginText>
				</form>
			</GlassMorphis>
		</Container>
	);
};

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

export default Register;
