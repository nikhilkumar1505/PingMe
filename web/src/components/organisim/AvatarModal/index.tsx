import React, { useCallback } from 'react';
import Modal from 'react-modal';
import './style.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { AvatarBox } from '../..';
import { getAvatarImageUrl } from '../../../utils/user';
import styled, { useTheme } from 'styled-components';
import { updateValue } from '../../../store/slices';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { MdCancel } from 'react-icons/md';

interface AvatarProps {
	isOpen: boolean;
	handleClose?: () => void;
}

export const AvatarModal: React.FC<AvatarProps> = ({ isOpen, handleClose }) => {
	const avatars = useAppSelector((state) => state.app.avatars);
	const avatarId = useAppSelector((state) => state.user.avatarId);
	const avatrUrl = getAvatarImageUrl(avatars, avatarId) || avatars[0];
	const dispatch = useAppDispatch();
	const theme = useTheme();

	const handleClick = useCallback((id: string) => {
		dispatch(updateValue({ key: 'avatarId', value: id }));
	}, []);

	return (
		<Modal isOpen={isOpen} style={style} onRequestClose={handleClose}>
			<TitleCloseWrapper>
				<ModalTitle>Select Avatar</ModalTitle>
			</TitleCloseWrapper>
			<MdCancel
				onClick={handleClose}
				color={theme.colors.dark}
				className='close-icon'
				size={20}
				title={'close'}
			/>
			<Container>
				{avatars.length &&
					avatars.map((avatar) => (
						<AvatarBox
							imageUrl={avatar?.image_url}
							selected={avatar?._id === avatrUrl?._id}
							title={avatar.name}
							key={avatar?._id}
							handleClick={() => handleClick(avatar?._id)}
						/>
					))}
			</Container>
		</Modal>
	);
};

const Container = styled.div(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
	gridGap: '0.5rem',
	[`@media(${theme.devices.laptop})`]: {
		gridGap: '0.5rem',
		gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))',
	},
}));

const TitleCloseWrapper = styled.div(() => ({
	position: 'relative',
	margin: '2rem 0 2rem',
}));

const ModalTitle = styled.h2(({ theme }) => ({
	textAlign: 'center',
	fontWeight: '700',
	color: theme.colors.dark,
	letterSpacing: '1.5px',
}));

const style = {
	content: {
		minWidth: '30rem',
		maxWidth: '70rem',
		alignSelf: 'center',
		borderRadius: '1rem',
		border: '2px solid #00407177',
		top: '40%',
		left: '50%',
		transform: 'translate(-50%, -40%)',
	},
};
