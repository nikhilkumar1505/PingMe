import { useFormik } from 'formik';
import React from 'react';
import { Button, TextInput } from '../../../components';

export const ResetPassword = () => {
	const passwordFormik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		onSubmit: () => console.log('submited'),
	});
	return (
		<form onSubmit={passwordFormik.submitForm}>
			<TextInput
				value={passwordFormik.values.password}
				type='text'
				name='Password'
				placeholder='Password'
				onChange={passwordFormik.handleChange}
			/>
			<TextInput
				value={passwordFormik.values.confirmPassword}
				type='text'
				name='confirm Password'
				placeholder='confirm Password'
				onChange={passwordFormik.handleChange}
			/>
			<Button
				text='reset'
				className='login-style '
				onClick={() => console.log('clicekd')}
				type='submit'
			/>
		</form>
	);
};
