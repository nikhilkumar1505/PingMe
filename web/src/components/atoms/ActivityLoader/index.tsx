import React from 'react';
import { SyncLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export const ActivityLoader: React.FC = () => {
	const theme = useTheme();
	return <SyncLoader color={theme.colors.white} size={7} />;
};
