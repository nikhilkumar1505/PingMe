import React from 'react';
import { TbColorPicker } from 'react-icons/tb';
import styled from 'styled-components';

interface AvatarProp {
	size?: string;
	showIcon?: boolean;
	color?: string;
	imageUrl?: string;
	handleIconClick?: () => void;
}

const Avatar: React.FC<AvatarProp> = ({
	size,
	showIcon,
	color,
	imageUrl,
	handleIconClick,
}) => {
	return (
		<AvatarContainer size={size} color={color}>
			<AvatarImage size={size} src={imageUrl} alt='' />
			{showIcon && (
				<EditIcon onClick={handleIconClick}>
					<TbColorPicker size={15} color='white' />
				</EditIcon>
			)}
		</AvatarContainer>
	);
};

export { Avatar };

interface AvatarContainerProp {
	size?: string;
	color?: string;
}

const AvatarContainer = styled.div<AvatarContainerProp>(({ size }) => ({
	width: size ?? '10rem',
	height: size ?? '10rem',
	borderRadius: '50%',
	overflow: 'visible',
	position: 'relative',
}));

const AvatarImage = styled.img<AvatarContainerProp>(
	({ size, theme, color }) => ({
		width: size ?? '6rem',
		height: size ?? '6rem',
		borderRadius: '50%',
		objectFit: 'cover',
		borderColor: color ?? theme.colors.primary,
		borderWidth: '0.3rem',
		borderStyle: 'solid',
		[`@media(${theme.devices.laptop})`]: {
			width: size ?? '10rem',
			height: size ?? '10rem',
		},
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
