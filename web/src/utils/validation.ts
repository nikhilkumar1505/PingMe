import * as yup from 'yup';

const passwordValidation = yup
	.string()
	.min(6, ({ min }) => `Please must have atleast  ${min} charaters`)
	.matches(/\w*[A-Z]\w*/, 'Please must have atleast one capital letter')
	.matches(/\w*[a-z]\w*/, 'Please must have atleast one small letter')
	.matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, 'Please must have atleast one symbol')
	.matches(/\d/, 'Please must have atleast one number')
	.required('Password  is Required');

const confirmPassword = yup
	.string()
	.oneOf([yup.ref('password')], 'Password do not match')
	.required('Confirm password  is Required');

export const EmailSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Email  is Required'),
});

export const LoginSchema = yup.object().shape({
	username: yup.string().required('Username  is Required'),
	password: yup.string().required('Password  is Required'),
});

export const SignupSchema = yup.object().shape({
	username: yup.string().required('Username  is Required'),
	fullName: yup.string().required('FullName  is Required'),
	password: passwordValidation,
	confirmPassword: confirmPassword,
});

export const ForgotPasswordSchema = yup.object().shape({
	password: passwordValidation,
	confirmPassword: confirmPassword,
});
