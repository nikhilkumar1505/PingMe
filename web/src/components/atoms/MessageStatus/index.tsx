import React from 'react';
import { PiCheckBold, PiChecksBold, PiTimer } from 'react-icons/pi';
import { useTheme } from 'styled-components';

interface MessageStatusProp {
	status?: string;
	style?: any;
}

export const MessageStatus: React.FC<MessageStatusProp> = ({
	status,
	style,
}) => {
	const theme = useTheme();
	switch (status) {
		case 'sent':
			return (
				<PiCheckBold size={'1.3rem'} color={theme.colors.dark} style={style} />
			);
		case 'seen':
			return (
				<PiChecksBold
					size={'1.3rem'}
					color={theme.colors.primary}
					style={style}
				/>
			);
		case 'sending':
			return (
				<PiTimer size={'1.3rem'} color={theme.colors.white} style={style} />
			);

		default:
			return <></>;
	}
};
