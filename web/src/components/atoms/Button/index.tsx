import React, { useMemo } from 'react';
import styled from 'styled-components';
import './style.css';
import { ActivityLoader } from '../ActivityLoader';

interface Ibutton {
	text: string;
	onClick: (e?: any) => void;
	className?: string;
	backgroundColor?: string;
	color?: string;
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	Placeholder?: () => JSX.Element;
	isLoading?: boolean;
}

export const Button: React.FC<Ibutton> = ({
	text,
	onClick,
	className,
	backgroundColor,
	color,
	disabled = false,
	type = 'button',
	Placeholder,
	isLoading = false,
}) => {
	const LoadingComponent = useMemo(() => {
		return Placeholder ? Placeholder : ActivityLoader;
	}, [Placeholder]);

	const btnDisabled = isLoading || disabled;
	return (
		<PMbutton
			className={`${className} ${!btnDisabled ? 'main-button' : ''}`}
			onClick={onClick}
			disabled={btnDisabled}
			color={color}
			type={type}
			backgroundColor={backgroundColor}>
			{isLoading ? <LoadingComponent /> : text}
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
		borderRadius: '1rem',
	})
);
