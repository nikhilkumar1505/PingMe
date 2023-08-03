import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import backgroundImage from '../../assets/Images/bg1.png';
import { GlassMorphis, Logo, Otp, Signup } from '../../components';
import { useFormik } from 'formik';
import ProfileFill from '../../components/organisim/ProfileFill';
import { EmailSchema } from '../../utils/validation';
import { sendOtp, checkEmailExits } from '../../store/controllers/';
import { toast } from 'react-toastify';

const Register = () => {
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const handleNext = useCallback(() => setPage((prev) => prev + 1), []);

	const handleBack = useCallback(() => setPage((prev) => prev - 1), []);

	const handleSubmit = useCallback(async (value: { email: string }) => {
		try {
			setLoading(true);
			const isEmailExits = await checkEmailExits({ emailId: value.email });
			if (!isEmailExits) {
				const res = await sendOtp({ emailId: value.email });
				if (res?.status === 200) {
					toast.success('Otp is sent to emailId');
					handleNext();
				}
			} else {
				toast.error('User email already exits');
			}
		} finally {
			setLoading(false);
		}
	}, []);

	const signUpFormik = useFormik({
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
				return <Signup formikValue={signUpFormik} isLoading={loading} />;
			case 2:
				return (
					<Otp
						email={signUpFormik.values.email}
						handleNext={handleNext}
						handlePrev={handleBack}
					/>
				);
			case 3:
				return <ProfileFill emailId={signUpFormik.values.email} />;
			default:
				return <></>;
		}
	}, [page, signUpFormik, loading]);

	return (
		<Container>
			<Logo />
			<GlassMorphis title={'Welcome'}>{Body()}</GlassMorphis>
		</Container>
	);
};

const Container = styled.div({
	backgroundImage: `url(${backgroundImage})`,
	backgroundAttachment: 'fixed',
	backgroundPosition: 'center',
	width: '100%',
	minHeight: '100vh',
	height: '100%',
	backgroundSize: 'cover',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: '3rem  0',
});

export default Register;
