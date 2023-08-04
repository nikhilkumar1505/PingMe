import React, { useCallback, useState } from 'react';
import { IoCall } from 'react-icons/io5';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { ChatListHeader } from '../../molecules/ChatListHeader';

export const ChatDetails = () => {
	const [isSettingIcon, setIsSettingIcon] = useState(true);
	const avatars = useAppSelector((state) => state.app.avatars);

	const handleIconClick = useCallback(() => {
		setIsSettingIcon((prev) => !prev);
	}, []);
	return (
		<Container>
			<ChatListHeader
				handleIconClick={handleIconClick}
				Icon={IoCall}
				imageUrl={avatars[2]?.image_url}
			/>
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	flex: 5,
	backgroundColor: theme.colors.white,
}));
