import React from 'react';
import styled from 'styled-components';
import './style.css';

interface Ibutton {
	text: string;
	onClick: () => void;
	className?: string;
	backgroundColor?: string;
	color?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<Ibutton> = ({
	text,
	onClick,
	className,
	backgroundColor,
	color,
	disabled = false,
	type = 'button',
}) => {
	return (
		<PMbutton
			className={`${className} ${!disabled ? 'main-button' : ''}`}
			onClick={onClick}
			disabled={disabled}
			color={color}
			type={type}
			backgroundColor={backgroundColor}>
			{text}
		</PMbutton>
	);
};

interface PMbuttonProps {
	backgroundColor?: string;
	color?: string;
}

const PMbutton = styled.button<PMbuttonProps>(
	({ theme, backgroundColor, color, disabled }) => ({
		backgroundColor: backgroundColor ?? theme.colors.secondary,
		opacity: disabled ? 0.4 : 1,
		color: color ?? theme.colors.white,
		padding: '1rem 2rem ',
		border: 0,
		fontSize: '1.4rem',
		textTransform: 'uppercase',
		letterSpacing: '0.15rem',
		borderRadius: '2rem',
	})
);
