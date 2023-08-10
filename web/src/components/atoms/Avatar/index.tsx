import React, { useCallback } from 'react';
import { TbColorPicker } from 'react-icons/tb';
import styled from 'styled-components';

interface AvatarProp {
	size?: string;
	showIcon?: boolean;
	color?: string;
	imageUrl?: string;
	handleIconClick?: () => void;
	handleAvatarClick?: () => void;
	clickable?: boolean;
}

const Avatar: React.FC<AvatarProp> = ({
	size,
	showIcon,
	color,
	imageUrl,
	handleIconClick,
	handleAvatarClick,
	clickable,
}) => {
	const onClick = useCallback(() => {
		handleAvatarClick?.();
	}, []);
	return (
		<AvatarContainer size={size} onClick={onClick} clickable={clickable}>
			<AvatarImage size={size} color={color} src={imageUrl} alt='' />
			{showIcon && (
				<EditIcon onClick={handleIconClick}>
					<TbColorPicker size={15} color='white' title='edit-avatar' />
				</EditIcon>
			)}
		</AvatarContainer>
	);
};

export { Avatar };

interface AvatarContainerProp {
	size?: string;
	color?: string;
	clickable?: boolean;
}

const AvatarContainer = styled.div<AvatarContainerProp>(
	({ size, clickable }) => ({
		width: size ?? '10rem',
		height: size ?? '10rem',
		borderRadius: '50%',
		overflow: 'visible',
		position: 'relative',
		cursor: clickable ? 'pointer' : 'inherit',
	})
);

const AvatarImage = styled.img<AvatarContainerProp>(
	({ size, theme, color }) => ({
		width: size ?? '10rem',
		height: size ?? '10rem',
		borderRadius: '50%',
		objectFit: 'cover',
		borderColor: color ?? theme.colors.primary,
		borderWidth: '0.3rem',
		borderStyle: 'solid',
	})
);

const EditIcon = styled.div(({ theme }) => ({
	backgroundColor: theme.colors.secondary,
	borderRadius: '50%',
	position: 'absolute',
	bottom: 0,
	right: '1rem',
	zIndex: 2,
	padding: '0.5rem',
	cursor: 'pointer',
}));
