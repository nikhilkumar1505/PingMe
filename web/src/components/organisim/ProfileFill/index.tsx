import { useFormik } from 'formik';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SignupSchema } from '../../../utils/validation';
import { styled } from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { Avatar, AvatarModal, Button, TextInput } from '../..';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { updateValue } from '../../../store/slices';
import { getAvatarImageUrl } from '../../../utils/user';
import { register } from '../../../store/controllers';
import { registerProp } from '../../../types';

interface ProfileFillProps {
	emailId: string;
}

const ProfileFill: React.FC<ProfileFillProps> = ({ emailId }) => {
	const dispatch = useAppDispatch();
	const avatars = useAppSelector((state) => state.app.avatars);
	const avatarId = useAppSelector((state) => state.user.avatarId);
	const avatrUrl = getAvatarImageUrl(avatars, avatarId);
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const randomValue = Math.floor(Math.random() * (avatars.length - 1));
		dispatch(
			updateValue({ key: 'avatarId', value: avatars[randomValue]?._id })
		);
	}, [avatars]);

	const handleModalClose = useCallback(() => {
		setShowModal(false);
	}, []);

	const handlesubmit = useCallback(
		async (value: registerProp | any) => {
			try {
				setLoading(true);
				const payload = {
					username: value?.username,
					fullName: value?.fullName,
					password: value?.password,
					avatarId,
					emailId,
				};
				await register(payload as registerProp);
			} finally {
				setLoading(false);
			}
		},
		[avatarId, emailId]
	);

	const profileFormik = useFormik({
		initialValues: {
			username: '',
			password: '',
			confirmPassword: '',
			fullName: '',
		},
		validationSchema: SignupSchema,
		validateOnBlur: true,
		validateOnChange: false,
		onSubmit: handlesubmit,
	});

	return (
		<>
			<Container>
				<Avatar
					imageUrl={avatrUrl?.image_url}
					showIcon
					handleIconClick={() => setShowModal(true)}
				/>
				<EmailText>
					Email Id: <EmailId>{emailId}</EmailId>
				</EmailText>
				<form onSubmit={profileFormik.handleSubmit}>
					<TextInput
						value={profileFormik.values.username}
						type='text'
						name='username'
						placeholder='username'
						onChange={profileFormik.handleChange}
						error={profileFormik.errors.username}
					/>
					<TextInput
						value={profileFormik.values.fullName}
						type='text'
						name='fullName'
						placeholder='full name'
						onChange={profileFormik.handleChange}
						error={profileFormik.errors.fullName}
					/>
					<TextInput
						value={profileFormik.values.password}
						type='text'
						name='password'
						placeholder='password'
						onChange={profileFormik.handleChange}
						error={profileFormik.errors.password}
						passwordType
					/>
					<TextInput
						value={profileFormik.values.confirmPassword}
						type='text'
						name='confirmPassword'
						placeholder='confirm Password'
						onChange={profileFormik.handleChange}
						error={profileFormik.errors.confirmPassword}
						passwordType
					/>
					<br />
					<Button
						text='register'
						onClick={profileFormik.handleSubmit}
						type='submit'
						isLoading={loading}
					/>
				</form>
			</Container>
			<AvatarModal isOpen={showModal} handleClose={handleModalClose} />
		</>
	);
};

export default ProfileFill;

const Container = styled.div(() => ({
	alignItems: 'center',
	display: 'flex',
	flexDirection: 'column',
}));

const EmailText = styled.p(({ theme }) => ({
	textAlign: 'start',
	width: '100%',
	color: theme.colors.violet,
	fontSize: '1.6rem',
	margin: '3rem 0 2rem',
}));

const EmailId = styled.span(({ theme }) => ({
	color: theme.colors.dark,
	fontWeight: '700',
	fontSize: '1.6rem',
}));
