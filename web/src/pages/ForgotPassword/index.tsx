import React from 'react';
import {
	Logo,
	GlassMorphis,
	ResetPassword,
	ForgotPasswordEmail,
	Otp,
} from '../../components';
import styled from 'styled-components';
import backgroundImage from '../../assets/Images/bg1.png';
import { useFormik } from 'formik';

const ForgotPassword = () => {
	const emailFormik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: () => console.log('submited'),
	});
	return (
		<Container>
			<Logo />
			<GlassMorphis
				title={'Reset  Password'}
				titleClassName='forgot-password-text'>
				{/* <ForgotPasswordEmail /> */}
				{/* <ResetPassword /> */}
				<Otp />
			</GlassMorphis>
		</Container>
	);
};

export default ForgotPassword;

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
