import { Form, useFormik } from 'formik';
import React, { useCallback, useState } from 'react';
import { Button, TextInput } from '../../../components';
import { ForgotPasswordSchema } from '../../../utils/validation';
import { forgotPassword } from '../../../store/controllers';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ResetPasswordProp {
	emailId: string;
}

export const ResetPassword: React.FC<ResetPasswordProp> = ({ emailId }) => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = useCallback(
		async (value: any) => {
			setIsLoading(true);
			try {
				const payload = { emailId, password: value?.password };
				const res = await forgotPassword(payload);
				if (res?.status === 200) {
					toast.success('Password changed successfully!');
					navigate('/login', { replace: true });
				}
			} finally {
				setIsLoading(false);
			}
		},
		[emailId]
	);

	const passwordFormik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: ForgotPasswordSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: handleSubmit,
	});
	return (
		<form onSubmit={passwordFormik.handleSubmit}>
			<TextInput
				value={passwordFormik.values.password}
				type='text'
				name='password'
				placeholder='Password'
				onChange={passwordFormik.handleChange}
				error={passwordFormik.errors.password}
				passwordType
			/>
			<TextInput
				value={passwordFormik.values.confirmPassword}
				type='text'
				name='confirmPassword'
				placeholder='confirm Password'
				onChange={passwordFormik.handleChange}
				error={passwordFormik.errors.confirmPassword}
				passwordType
			/>
			<Button
				text='reset'
				className='login-style '
				onClick={passwordFormik.handleSubmit}
				type='submit'
				isLoading={isLoading}
			/>
		</form>
	);
};
