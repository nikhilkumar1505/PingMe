import React, { useCallback, useState } from 'react';
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
import { EmailSchema } from '../../utils/validation';
import { sendOtp, checkEmailExits } from '../../store/controllers';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const handleNext = useCallback(() => setPage((prev) => prev + 1), []);

	const handleSubmit = useCallback(async (value: { email: string }) => {
		try {
			setLoading(true);
			const isEmailExits = await checkEmailExits({ emailId: value.email });
			if (isEmailExits) {
				const res = await sendOtp({ emailId: value.email });
				if (res?.status === 200) {
					toast.success('Otp is sent to emailId');
					handleNext();
				}
			} else {
				toast.error('User email does not exist');
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const handleBack = useCallback(() => setPage((prev) => prev - 1), []);
	const emailFormik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: EmailSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: handleSubmit,
	});

	const Body = useCallback(() => {
		switch (page) {
			case 1:
				return (
					<ForgotPasswordEmail formikValue={emailFormik} isLoading={loading} />
				);
			case 2:
				return (
					<Otp
						email={emailFormik.values.email}
						handleNext={handleNext}
						handlePrev={handleBack}
					/>
				);
			case 3:
				return <ResetPassword emailId={emailFormik.values.email} />;
			default:
				return <></>;
		}
	}, [page, emailFormik, loading]);
	return (
		<Container>
			<Logo />
			<GlassMorphis
				title={'Reset  Password'}
				titleClassName='forgot-password-text'>
				{Body()}
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
