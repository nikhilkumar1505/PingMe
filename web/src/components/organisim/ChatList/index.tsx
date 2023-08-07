import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { ChatBox, ChatListHeader, SearchInput } from '../..';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { IoSettings, IoChatbox } from 'react-icons/io5';
import { AiOutlineConsoleSql } from 'react-icons/ai';

export const ChatList = () => {
	const [isSettingIcon, setIsSettingIcon] = useState(true);
	const userdetails = useAppSelector((state) => state.user);
	const Icon = isSettingIcon ? IoSettings : IoChatbox;
	const [search, setSearch] = useState('');

	const handleIconClick = useCallback(() => {
		setIsSettingIcon((prev) => !prev);
	}, []);

	return (
		<Container>
			<ChatListHeader
				handleIconClick={handleIconClick}
				Icon={Icon}
				imageUrl={userdetails?.imageUrl}
				title={userdetails?.fullName}
				subTitle={userdetails?.username}
			/>
			<Scrollable>
				<SearchInput
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<ListContainer>
					{[...Array(10)].map((item, index) => {
						return (
							<ChatBox
								imageUrl={userdetails?.imageUrl}
								lastIndex={index !== 9}
								key={index}
							/>
						);
					})}
				</ListContainer>
			</Scrollable>
		</Container>
	);
};

const Container = styled.div(({ theme }) => ({
	flex: 2,
	position: 'relative',
	backgroundColor: theme.colors.background3,
	maxWidth: '35rem',
	// borderRight: `2px solid ${theme.colors.dark}`,
	boxShadow: `2px 0px ${theme.colors.background2}`,
}));

const ListContainer = styled.div(({ theme }) => ({
	padding: '1rem 1.5rem',
	borderBottom: `2px solid ${theme.colors.background2}`,
}));

const Scrollable = styled.div(() => ({
	overflowY: 'scroll',
	marginBottom: '1rem',
	height: '90.5%',
}));
