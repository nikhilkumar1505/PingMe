import React from 'react';
import { IconType } from 'react-icons';
import styled, { useTheme } from 'styled-components';

interface HedaerIconProp {
	Icon: IconType;
	handleIconClick: (val?: any) => void;
	style?: any;
	title?: string;
}

export const HeaderIcon: React.FC<HedaerIconProp> = ({
	Icon,
	handleIconClick,
	style,
	title,
}) => {
	const theme = useTheme();
	return (
		<IconWrapper onClick={handleIconClick} style={style}>
			<Icon size={20} color={theme.colors.white} title={title} />
		</IconWrapper>
	);
};

const IconWrapper = styled.div(({ theme }) => ({
	borderRadius: '50%',
	borderWidth: '1px',
	padding: '0.5rem',
	cursor: 'pointer',
	['&:hover']: {
		backgroundColor: theme.colors.background2,
	},
}));
