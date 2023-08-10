import React, { useCallback } from 'react';
import Modal from 'react-modal';
import styled, { useTheme } from 'styled-components';
import { Button } from '../..';

interface CommonModaProp {
	visible: boolean;
	title: string;
	primaryBtnText?: string;
	primaryBtnOnClick?: () => void;
	secondaryBtntext?: string;
	secondaryBtnOnClick?: () => void;
	imageUrl?: string;
	descrption?: string;
}

export const CommonModal: React.FC<CommonModaProp> = ({
	visible,
	title,
	primaryBtnOnClick,
	primaryBtnText,
	secondaryBtnOnClick,
	secondaryBtntext,
	imageUrl,
	descrption,
}) => {
	const theme = useTheme();

	const handleClose = useCallback(() => {
		secondaryBtnOnClick?.();
	}, []);

	const handlePrimaryClick = useCallback(() => {
		primaryBtnOnClick?.();
	}, []);

	return (
		<Modal isOpen={visible} onRequestClose={handleClose} style={style}>
			<Container>
				<ModalTitle>{title}</ModalTitle>
				<ModalImage src={imageUrl} />
				<ModalDescrption>{descrption}</ModalDescrption>
				<ButtonWrapper>
					<Button
						backgroundColor={theme.colors.violet}
						text={secondaryBtntext as string}
						onClick={handleClose}
					/>
					<Button
						text={primaryBtnText as string}
						onClick={handlePrimaryClick}
					/>
				</ButtonWrapper>
			</Container>
		</Modal>
	);
};

const style = {
	content: {
		alignSelf: 'center',
		borderRadius: '1rem',
		inset: '15rem 30rem',
	},
	overlay: {
		backgroundColor: '#000000aa',
	},
};

const Container = styled.div(() => ({
	display: 'flex',
	alignItems: 'center',
	flexDirection: 'column',
}));

const ModalTitle = styled.h3(({ theme }) => ({
	textAlign: 'center',
	fontWeight: '800',
	color: theme.colors.violet,
	letterSpacing: '1.5px',
	fontSize: '3rem',
}));

const ModalDescrption = styled.p(({ theme }) => ({
	fontSize: '2rem',
	textAlign: 'center',
	fontWeight: '600',
	color: theme.colors.dark,
	letterSpacing: '1px',
	margin: '1rem 0',
}));

const ModalImage = styled.img(() => ({
	width: '15rem',
	height: '15rem',
	marginTop: '2.5rem',
}));

const ButtonWrapper = styled.div(() => ({
	display: 'flex',
	marginTop: '2rem',
	justifyContent: 'space-between',
	width: '21rem',
}));
